import { describe, expect, it, vi } from 'vitest'
import { MOCK_TOPICS } from '../../utils/getMocksTopics'
import { TOPICS_SELECT } from '../topics/constants'
import { getAllMyTopics } from './profile.controller'

vi.mock('../../../prisma/index', () => {
  return {
    default: {
      topics: {
        findMany: vi.fn().mockResolvedValue(
          MOCK_TOPICS.map(topic => ({
            ...topic,
            _count: {
              likes: 1,
              bookmark: 1,
            },
            likes: [],
          }))
        ),
        findUnique: vi.fn(({ where: { id } }) => {
          const topic = MOCK_TOPICS.find(data => {
            return data.id === id
          })

          if (!topic) {
            return null
          }

          return {
            ...topic,
            _count: {
              likes: 1,
              bookmark: 1,
            },
            likes: [],
          }
        }),
        create: vi.fn(({ data }) => {
          return {
            ...data,
            id: '123',
            createdAt: new Date(),
            updatedAt: new Date(),
          }
        }),
      },
      like: {
        findUnique: vi.fn().mockResolvedValue(null),
        delete: vi.fn().mockResolvedValue(true),
        create: vi.fn().mockResolvedValue(true),
      },
      bookmark: {
        findUnique: vi.fn().mockResolvedValue(null),
        delete: vi.fn().mockResolvedValue(true),
        create: vi.fn().mockResolvedValue(true),
      },
    },
  }
})

const TOPICS_KEYS = [...Object.keys(TOPICS_SELECT), 'isLiked', 'isBookmarked']
type TopicExpected = Record<string, unknown>

describe('profile', () => {
  it('get user\'s topics', async () => {
    const topics = await getAllMyTopics('123', { cursor: undefined, limit: 10 })

    expect(Array.isArray(topics.items)).toBeTruthy()

    topics.items.forEach((topic: TopicExpected) => {
      TOPICS_KEYS.forEach(key => {
        expect(topic[key]).not.toBeUndefined()
      })
    })

    expect(topics.nextCursor).not.toBeUndefined()
  })
})
