import type { TopicsSelect } from 'prisma/generated/models'

export const TOPICS_SELECT: TopicsSelect = {
  id: true,
  createdAt: true,
  updatedAt: true,
  title: true,
  shortDescription: true,
  description: true,
  content: true,
  level: true,
  duration: true,
  likes: true,
  userId: false,
  image: true,
}
