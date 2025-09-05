import fs from 'fs'
import path from 'path'
import type { Topics, User } from 'prisma/generated/client'

const MOCK_FILE = path.resolve(__dirname, 'mock-topics.json')

type RawTopic = Omit<Topics, 'createdAt' | 'updatedAt'> & {
  createdAt: string | Date
  updatedAt: string | Date
}

type MockTopicWithUser = Topics & {
  user: Pick<
    User,
    | 'id'
    | 'name'
    | 'email'
    | 'emailVerified'
    | 'image'
    | 'createdAt'
    | 'updatedAt'
    | 'username'
    | 'displayUsername'
  >
}

export function loadMockTopics(): MockTopicWithUser[] {
  const raw = fs.readFileSync(MOCK_FILE, 'utf-8')
  const parsed = JSON.parse(raw) as RawTopic[]

  return parsed.map(t => {
    const createdAt = new Date(t.createdAt)
    const updatedAt = new Date(t.updatedAt)

    const user: MockTopicWithUser['user'] = {
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
    }
  })
}

// Keep named export for existing imports (tests/seed)
export const MOCK_TOPICS: MockTopicWithUser[] = loadMockTopics()
