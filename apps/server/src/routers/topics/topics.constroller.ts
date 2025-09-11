import prisma from '../../../prisma/index'
import { TOPICS_SELECT } from './constants'
import { TRPCError } from '@trpc/server'
import type { TopicCreateSchema } from './topics.schema'
import type { FilterParamsSchema } from '@/schemas/filterParams.schema'
import type { Prisma } from 'prisma/generated/client'

export async function getAll(input: FilterParamsSchema) {
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

  const topics = await prisma.topics.findMany({
    orderBy: {
      [input.sortField!]: input.sort,
    },
    take: input.limit,
    skip: input.offset,
    where: {
      ...where,
      level: input.level,
      duration: {
        gte: input.duration
          ? new Date(`1970-01-01T${input.duration}:00Z`)
          : undefined,
      },
    },
    select: TOPICS_SELECT,
  })

  return topics
}

export async function getById(id: string) {
  try {
    const topic = await prisma.topics.findUnique({
      where: {
        id,
      },
      select: TOPICS_SELECT,
    })

    if (!topic) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Topic not found',
      })
    }

    return topic
  } catch (error) {
    throw error
  }
}

export async function createTopic(data: TopicCreateSchema, userId: string) {
  try {
    return await prisma.topics.create({
      data: {
        ...data,
        duration: data.duration.toISOString(),
        likes: 0,
        user: {
          connect: {
            id: userId,
          },
        },
      },
      select: TOPICS_SELECT,
    })
  } catch (error) {
    throw error
  }
}
