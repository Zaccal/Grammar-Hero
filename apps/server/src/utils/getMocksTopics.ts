import type { TopicPayload } from '@/routers/topics/topics.types'
import fs from 'node:fs'
import path from 'node:path'

const MOCK_FILE = path.resolve(__dirname, 'mock-topics.json')

export function loadMockTopics(): TopicPayload[] {
  const raw = fs.readFileSync(MOCK_FILE, 'utf-8')
  const parsed = JSON.parse(raw) as TopicPayload[]

  return parsed
}

// Keep named export for existing imports (tests/seed)
export const MOCK_TOPICS: TopicPayload[] = loadMockTopics()
