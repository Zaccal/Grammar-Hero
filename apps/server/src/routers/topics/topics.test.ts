import { MOCK_TOPICS } from '../../utils/getMocksTopics'
import { describe, expect, it, vi } from 'vitest'
import { createTopic, getAll, getById } from './topics.constroller'
import { TOPICS_SELECT } from './constants'
import { getDummyDate } from '../../utils/getDummyDate'
import { getMinMax } from '../../utils/getMinMaxMockDate'

vi.mock('../../../prisma/index', () => {
  return {
    default: {
      topics: {
        findMany: vi.fn().mockResolvedValue(MOCK_TOPICS),
        findUnique: vi.fn(({ where: { id } }) =>
          MOCK_TOPICS.find(data => {
            return data.id === id
          })
        ),
        create: vi.fn(({ data }) => {
          return {
            ...data,
            id: '123',
            createdAt: new Date(),
            updatedAt: new Date(),
          }
        }),
      },
    },
  }
})

const TOPICS_KEYS = Object.keys(TOPICS_SELECT)
type TopicExpected = Record<string, unknown>

describe('topics', () => {
  it('should return all topics', async () => {
    const topics = await getAll({})
    expect(Array.isArray(topics)).toBe(true)
    expect(topics.length).toBe(MOCK_TOPICS.length)
    const topic = topics[0] as TopicExpected

    console.log(topics)

    TOPICS_KEYS.forEach(key => {
      console.log(`${key}: ${topic[key]}`)

      expect(topic[key]).not.toBeUndefined()
    })
  })

  it('should return by id', async () => {
    const id = '5'
    const topic = (await getById(id)) as TopicExpected

    expect(topic.id).toBe(id)

    TOPICS_KEYS.forEach(key => {
      expect(topic[key]).not.toBeUndefined()
    })
  })

  it('it should retrun not found error', async () => {
    const id = '1123'
    await expect(getById(id)).rejects.toMatchObject({
      code: 'NOT_FOUND',
      message: 'Topic not found',
    })
  })

  it('it should create topic', async () => {
    const { min, max } = getMinMax()
    const topic = await createTopic(
      {
        title: 'title',
        description: 'description',
        shortDescription: 'shortDescription',
        content: 'content',
        durationMin: getDummyDate(min)!,
        durationMax: getDummyDate(max)!,
        level: 'Basic',
        image: 'image',
      },
      '123'
    )
    expect(topic).not.toBeUndefined()
  })
})
