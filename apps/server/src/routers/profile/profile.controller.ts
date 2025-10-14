import type { PaginationShema } from '@/schemas/pagination.schema'
import prisma from '../../../prisma/index'
import { getFormattedTopics } from '../../utils/index'
import { TOPICS_SELECT } from '../topics/constants'

export async function getAllMyTopics(
  userId: string,
  pagination: PaginationShema
) {
  const { cursor, limit } = pagination

  const topics = await prisma.topics.findMany({
    where: {
      userId,
    },
    take: limit + 1,
    cursor: cursor ? { id: cursor } : undefined,
    skip: cursor ? 1 : 0,
    orderBy: { createdAt: 'desc' },
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

  const hasMore = topics.length > limit
  const pageRows = hasMore ? topics.slice(0, limit) : topics // <= trim the extra row
  const nextCursor = hasMore ? pageRows[pageRows.length - 1].id : undefined // string!

  const items = getFormattedTopics(pageRows) // format AFTER slicing

  return { items, nextCursor }
}
