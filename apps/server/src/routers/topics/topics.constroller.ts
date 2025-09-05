import prisma from '../../../prisma/index'
import { TOPICS_SELECT } from './constants'
import { TRPCError } from '@trpc/server'

export async function getAll() {
  const topics = await prisma.topics.findMany({
    orderBy: {
      createdAt: 'desc',
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
