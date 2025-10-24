import type { PaginationShema } from '@/schemas/pagination.schema'
import prisma from '../../../prisma/index'
import { getFormattedTopics } from '../../utils/index'
import { TOPICS_SELECT } from '../topics/constants'

// TODO: Combine all endpoints into one
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
  const pageRows = hasMore ? topics.slice(0, limit) : topics
  const nextCursor = hasMore ? pageRows[pageRows.length - 1].id : undefined

  const items = getFormattedTopics(pageRows)

  return { items, nextCursor }
}

export async function getLikedTopics(
  userId: string,
  pagination: PaginationShema
) {
  const { cursor, limit } = pagination

  const topics = await prisma.topics.findMany({
    where: {
      userId,
      likes: {
        some: {
          userId,
        },
      },
    },
    take: limit + 1,
    cursor: cursor ? { id: cursor } : undefined,
    skip: cursor ? 1 : 0,
    orderBy: { updatedAt: 'desc' },
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

  const pageRows = hasMore ? topics.slice(0, limit) : topics
  const nextCursor = hasMore ? pageRows[pageRows.length - 1].id : undefined

  const items = getFormattedTopics(pageRows)

  return { items, nextCursor }
}

export async function getBookmarkedTopics(
  userId: string,
  pagination: PaginationShema
) {
  const { cursor, limit } = pagination

  const topics = await prisma.topics.findMany({
    where: {
      userId,
      bookmark: {
        some: {
          userId,
        },
      },
    },
    take: limit + 1,
    cursor: cursor ? { id: cursor } : undefined,
    skip: cursor ? 1 : 0,
    orderBy: { updatedAt: 'desc' },
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

  const pageRows = hasMore ? topics.slice(0, limit) : topics
  const nextCursor = hasMore ? pageRows[pageRows.length - 1].id : undefined

  const items = getFormattedTopics(pageRows)

  return { items, nextCursor }
}
