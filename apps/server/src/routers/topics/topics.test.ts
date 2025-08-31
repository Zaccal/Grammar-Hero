import { MOCK_TOPICS } from '../../lib/constants'
import { describe, expect, it, vi } from 'vitest'
import { getAll } from './topics.constroller'
import { TOPICS_SELECT } from './constants'

vi.mock('../../../prisma/index', () => {
  return {
    default: {
      topics: {
        findMany: vi.fn().mockResolvedValue(MOCK_TOPICS),
      },
    },
  }
})

const TOPICS_KEYS = Object.keys(TOPICS_SELECT)
type TopicExpected = Record<string, unknown>

describe('topics', () => {
  it('should return all topics', async () => {
    const topics = await getAll()
    expect(Array.isArray(topics)).toBe(true)
    expect(topics.length).toBe(MOCK_TOPICS.length)
    const topic = topics[0] as TopicExpected

    expect(TOPICS_KEYS.every(key => topic[key])).toBe(true)
  })
})
