import prisma from '../../../prisma/index'
import { TOPICS_SELECT } from './constants'

export async function getAll() {
  const topics = await prisma.topics.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    select: TOPICS_SELECT,
  })

  return topics
}
