import { MOCK_TOPICS } from '@/lib/constants'
import prisma from '../prisma/index'
import type { TopicsCreateManyInput } from './generated/models'

async function createMockTopics() {
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
    userId: 'UCEwby61ef3m8EEa1nRt2S93AbnmbrAq',
  }))
  await prisma.topics.createMany({
    data,
  })
}

async function main() {
  console.log('🌱 Seeding database...')

  // await createMockTopics()

  console.log('✅ Database seeded successfully.')
}

main()
