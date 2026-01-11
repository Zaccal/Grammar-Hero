import type { Prisma } from 'prisma/generated/client'
import type { TopicCreateSchema } from '../../schemas/topics.schema'
import type { FilterParamsSchema } from '@/schemas/filterParams.schema'
import { TRPCError } from '@trpc/server'
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
    take: input.limit + 1,
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

  const hasMore = topics.length > input.limit
  const pageRows = hasMore ? topics.slice(0, input.limit) : topics
  const nextCursor = hasMore ? pageRows[pageRows.length - 1].id : undefined
  const items = getFormattedTopics(topics).slice(0, input.limit)

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
