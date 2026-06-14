import type {
  TopicCreateSchema,
  TopicUpdateSchema,
} from '../../schemas/topics.schema'
import type { FilterParamsSchema } from '@/schemas/filterParams.schema'
import { TRPCError } from '@trpc/server'
import { Prisma } from '../../../prisma/generated/client'
import prisma from '../../../prisma/index'
import { getDummyDate, getFormattedTopics } from '../../utils/index'
import { TOPICS_SELECT } from './constants'

export async function getAll(input: FilterParamsSchema, userId: string) {
  const cursor = input.cursor ? { id: input.cursor } : undefined
  const where: Prisma.TopicsWhereInput = input.query
    ? {
        OR: [
          {
            title: {
              contains: input.query,
              mode: 'insensitive',
            },
          },
          {
            shortDescription: {
              contains: input.query,
              mode: 'insensitive',
            },
          },
          {
            user: {
              displayUsername: {
                contains: input.query,
                mode: 'insensitive',
              },
            },
          },
        ],
      }
    : {}

  const orderBy =
    input.sortField !== 'likes' && input.sortField
      ? { [input.sortField]: input.sort }
      : {
          likes: {
            _count: input.sort,
          },
        }

  // TODO: add pagination
  const topics = await prisma.topics.findMany({
    orderBy,
    cursor,
    take: (input.limit ?? 12) + 1,
    where: {
      ...where,
      level: input.level,
      durationMax: {
        lte: getDummyDate(input.durationMax),
      },
      durationMin: {
        gte: getDummyDate(input.durationMin),
      },
    },
    select: {
      ...TOPICS_SELECT,
      likes: {
        where: { userId },
        select: { id: true, userId: true, topicId: true },
      },
      bookmark: {
        where: { userId },
        select: { id: true, userId: true, topicId: true },
      },
    },
  })

  const hasMore = topics.length > (input.limit ?? 12)
  const pageRows = hasMore ? topics.slice(0, input.limit ?? 12) : topics
  const nextCursor = hasMore ? pageRows.at(-1)!.id : undefined
  const items = getFormattedTopics(topics).slice(0, input.limit ?? 12)

  return { items, nextCursor }
}

export async function getById(id: string, userId: string) {
  const topic = await prisma.topics.findUnique({
    where: {
      id,
    },
    select: {
      ...TOPICS_SELECT,
      likes: {
        where: { userId },
        select: { id: true, userId: true, topicId: true },
      },
      bookmark: {
        where: { userId },
        select: { id: true, userId: true, topicId: true },
      },
    },
  })

  if (!topic) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Topic not found',
    })
  }

  return getFormattedTopics([topic])[0]
}

export async function createTopic(data: TopicCreateSchema, userId: string) {
  return await prisma.topics.create({
    data: {
      ...data,
      durationMin: getDummyDate(data.durationMin)!,
      durationMax: getDummyDate(data.durationMax)!,
      exercises: {
        create: data.exercises.map(({ answers, ...rest }) => ({
          ...rest,
          answers: {
            create: answers,
          },
        })),
      },
      user: {
        connect: {
          id: userId,
        },
      },
    },
    select: TOPICS_SELECT,
  })
}

export async function toggleLike(topicId: string, userId: string) {
  const existing = await prisma.like.findUnique({
    where: {
      userId_topicId: {
        topicId,
        userId,
      },
    },
  })

  if (existing) {
    await prisma.like.delete({
      where: {
        id: existing.id,
      },
    })

    return { isLiked: false }
  }
 else {
    await prisma.like.create({
      data: {
        topicId,
        userId,
      },
    })

    return { isLiked: true }
  }
}

export async function toggleBookmark(topicId: string, userId: string) {
  const existing = await prisma.bookmark.findUnique({
    where: {
      userId_topicId: {
        topicId,
        userId,
      },
    },
  })

  if (existing) {
    await prisma.bookmark.delete({
      where: {
        id: existing.id,
      },
    })

    return { isBookmarked: false }
  }
 else {
    await prisma.bookmark.create({
      data: {
        userId,
        topicId,
      },
    })

    return { isBookmarked: true }
  }
}

export async function deleteTopic(topicId: string, userId: string) {
  try {
    const topic = await prisma.topics.delete({
      where: {
        id: topicId,
        userId,
      },
    })

    return { success: true, topic }
  }
 catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Topic not found' })
      }

      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: error.message,
      })
    }

    throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' })
  }
}

export async function updateTopic(
  topicId: string,
  userId: string,
  data: TopicUpdateSchema
) {
  try {
    const topic = await prisma.$transaction(async tx => {
      await tx.topics.update({
        where: { id: topicId, userId },
        data: {
          title: data.title,
          description: data.description,
          shortDescription: data.shortDescription,
          content: data.content,
          image: data.image,
          level: data.level,
          durationMin: getDummyDate(data.durationMin)!,
          durationMax: getDummyDate(data.durationMax)!,
        },
      })

      const existingExercises = await tx.exercise.findMany({
        where: { topicId },
        select: { id: true },
      })
      const existingExerciseIds = new Set(existingExercises.map(({ id }) => id))

      await Promise.all(
        data.exercises.map(async exercise => {
          const { id, answers, ...exerciseInput } = exercise

          if (!id || !existingExerciseIds.has(id)) {
            await tx.exercise.create({
              data: {
                ...exerciseInput,
                topicId,
                answers: {
                  create: answers.map(({ id: _id, ...answer }) => answer),
                },
              },
            })

            return
          }

          const existingAnswers = await tx.answer.findMany({
            where: { exerciseId: id },
            select: { id: true },
          })
          const existingAnswerIds = new Set(existingAnswers.map(({ id }) => id))

          const updatedExercise = await tx.exercise.updateMany({
            where: { id, topicId },
            data: exerciseInput,
          })

          if (updatedExercise.count === 0) {
            throw new TRPCError({
              code: 'NOT_FOUND',
              message: 'Exercise not found',
            })
          }

          await Promise.all(
            answers.map(async answer => {
              const { id: answerId, ...answerInput } = answer

              if (!answerId || !existingAnswerIds.has(answerId)) {
                return tx.answer.create({
                  data: {
                    ...answerInput,
                    exerciseId: id,
                  },
                })
              }

              const updatedAnswer = await tx.answer.updateMany({
                where: { id: answerId, exerciseId: id },
                data: answerInput,
              })

              if (updatedAnswer.count === 0) {
                throw new TRPCError({
                  code: 'NOT_FOUND',
                  message: 'Answer not found',
                })
              }
            })
          )
        })
      )

      return tx.topics.findUnique({
        where: { id: topicId },
        select: TOPICS_SELECT,
      })
    })

    return { success: true, topic }
  }
 catch (error) {
    if (error instanceof TRPCError) {
      throw error
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Topic not found' })
      }

      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: error.message,
      })
    }

    throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' })
  }
}
