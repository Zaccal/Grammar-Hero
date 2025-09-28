import type { Prisma } from 'prisma/generated/client'
import type { TopicCreateSchema } from '../../schemas/topics.schema'
import type { FilterParamsSchema } from '@/schemas/filterParams.schema'
import { TRPCError } from '@trpc/server'
import prisma from '../../../prisma/index'
import { getDummyDate } from '../../utils/getDummyDate'
import { TOPICS_SELECT } from './constants'

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
      durationMax: {
        lte: getDummyDate(input.durationMax),
      },
      durationMin: {
        gte: getDummyDate(input.durationMin),
      },
    },
    select: TOPICS_SELECT,
  })

  return topics
}

export async function getById(id: string) {
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
}

export async function createTopic(data: TopicCreateSchema, userId: string) {
  return await prisma.topics.create({
    data: {
      ...data,
      durationMin: getDummyDate(data.durationMin)!,
      durationMax: getDummyDate(data.durationMax)!,
      likes: 0,
      user: {
        connect: {
          id: userId,
        },
      },
    },
    select: TOPICS_SELECT,
  })
}
