import { MOCK_TOPICS } from '@/lib/getMocksTopics'
import prisma from '../prisma/index'
import type { TopicsCreateManyInput } from './generated/models'

async function createMockTopics(userId: string) {
  console.log('🌾 Creating mock topics...')

  const data: TopicsCreateManyInput[] = MOCK_TOPICS.map(topic => ({
    title: topic.title,
    shortDescription: topic.shortDescription,
    description: topic.description,
    content: topic.content,
    level: topic.level,
    duration: topic.duration,
    likes: topic.likes,
    image: topic.image,
    userId,
  }))
  await prisma.topics.createMany({
    data,
  })
}

async function main() {
  console.log('🌱 Seeding database...')

  await createMockTopics('YUTV4L9mGwjcD1FWrr5JDLbgk0Lo9MdZ')

  console.log('✅ Database seeded successfully.')
}

main()
