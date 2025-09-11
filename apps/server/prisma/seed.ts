import { MOCK_TOPICS } from '@/utils/getMocksTopics'
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
    duration: new Date(
      Date.now() + Math.floor(Math.random() * 900000) + 300000
    ).toISOString(),
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

  await createMockTopics('gfCfkgoQ4gjIfSI3sm8H3CPf6JueJm1N')

  console.log('✅ Database seeded successfully.')
}

main()
