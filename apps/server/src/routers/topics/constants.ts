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
  durationMin: true,
  durationMax: true,
  likes: true,
  user: true,
  image: true,
  bookmark: {
    select: {
      _count: true,
    },
  },
}
