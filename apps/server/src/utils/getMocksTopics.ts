import type { Topic } from '@/routers/topics/topics.types'
import fs from 'node:fs'
import path from 'node:path'
import { getDummyDate } from './getDummyDate'
import { getMinMax } from './getMinMaxMockDate'

const MOCK_FILE = path.resolve(__dirname, 'mock-topics.json')

export function loadMockTopics(): Topic[] {
  const raw = fs.readFileSync(MOCK_FILE, 'utf-8')
  const parsed = JSON.parse(raw) as Topic[]

  return parsed.map(t => {
    const createdAt = new Date(t.createdAt)
    const updatedAt = new Date(t.updatedAt)
    const { min, max } = getMinMax()

    const user: Topic['user'] = {
      id: t.userId,
      name: `User ${t.userId}`,
      email: `${t.userId}@example.com`,
      emailVerified: true,
      image: null,
      createdAt,
      updatedAt,
      username: null,
      displayUsername: null,
    }

    return {
      ...t,
      createdAt,
      updatedAt,
      user,
      bookmark: [],
      durationMin: getDummyDate(min)!,
      durationMax: getDummyDate(max)!,
    }
  })
}

// Keep named export for existing imports (tests/seed)
export const MOCK_TOPICS: Topic[] = loadMockTopics()
