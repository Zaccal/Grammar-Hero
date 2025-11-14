import { describe, expect, it, vi } from 'vitest'
import { MOCK_TOPICS } from '../../utils/getMocksTopics'
import { TOPICS_SELECT } from './constants'
import {
  createTopic,
  getAll,
  getById,
  toggleBookmark,
  toggleLike,
} from './topics.constroller'

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

describe('topics', () => {
  it('should return all topics', async () => {
    const topics = await getAll(
      {
        limit: 10,
      },
      '123'
    )
    expect(topics).not.toBeUndefined()
    expect(topics).not.toBeNull()

    expect(topics).toHaveProperty('items')

    expect(Array.isArray(topics.items)).toBe(true)
    expect(topics.items.length).toBe(10)
    const topic = topics.items[0] as TopicExpected

    TOPICS_KEYS.forEach(key => {
      expect(topic[key]).not.toBeUndefined()
    })
  })

  it('should return by id', async () => {
    const id = '5'
    const topic = (await getById(id, '123')) as TopicExpected

    expect(topic.id).toBe(id)

    TOPICS_KEYS.forEach(key => {
      expect(topic[key]).not.toBeUndefined()
    })
  })

  it('it should retrun not found error', async () => {
    const id = '1123'
    await expect(getById(id, '123')).rejects.toMatchObject({
      code: 'NOT_FOUND',
      message: 'Topic not found',
    })
  })

  it('it should create topic', async () => {
    const topic = await createTopic(
      {
        title: 'title',
        description: 'description',
        shortDescription: 'shortDescription',
        content: 'content',
        durationMin: '00:05:00',
        durationMax: '00:10:00',
        level: 'Basic',
        image: 'image',
      },
      '123'
    )
    expect(topic).not.toBeUndefined()
  })

  it('should like topic', async () => {
    const topicId = '5'
    const userId = '123'
    const topic = (await getById(topicId, userId)) as TopicExpected
    expect(topic.isLiked).toBe(false)

    const response = await toggleLike(topicId, userId)

    expect(response.isLiked).toBe(true)
  })

  it('should bookmark topic', async () => {
    const topicId = '5'
    const userId = '123'
    const topic = (await getById(topicId, userId)) as TopicExpected
    expect(topic.isBookmarked).toBe(false)

    const response = await toggleBookmark(topicId, userId)

    expect(response.isBookmarked).toBe(true)
  })
})
