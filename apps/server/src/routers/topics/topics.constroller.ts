import type { Prisma } from 'prisma/generated/client'
import type { TopicCreateSchema } from '../../schemas/topics.schema'
import type { FilterParamsSchema } from '@/schemas/filterParams.schema'
import { TRPCError } from '@trpc/server'
import prisma from '../../../prisma/index'
import { getDummyDate, getFormattedTopics } from '../../utils/index'
import { TOPICS_SELECT } from './constants'

export async function getAll(input: FilterParamsSchema, userId: string) {
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

  const topics = await prisma.topics.findMany({
    orderBy,
    take: input.limit,
    skip: input.offset,
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
    },
  })

  return getFormattedTopics(topics)
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
