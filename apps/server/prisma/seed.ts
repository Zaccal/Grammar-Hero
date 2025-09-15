import { MOCK_TOPICS } from '@/utils/getMocksTopics'
import prisma from '../prisma/index'
import type { TopicsCreateInput } from './generated/models'
import { getDummyDate } from '@/utils/getDummyDate'
import { getMinMax } from '@/utils/getMinMaxMockDate'

async function createMockTopics(userId: string) {
  console.log('🌾 Creating mock topics...')

  for (let index = 0; index < MOCK_TOPICS.length; index++) {
    const { min, max } = getMinMax()
    const topic = MOCK_TOPICS[index]
    const data: TopicsCreateInput = {
      title: topic.title,
      shortDescription: topic.shortDescription,
      description: topic.description,
      content: topic.content,
      level: topic.level,
      durationMax: getDummyDate(max) ?? '',
      durationMin: getDummyDate(min) ?? '',
      likes: topic.likes,
      image: topic.image,
      user: {
        connect: {
          id: userId,
        },
      },
    }
    await prisma.topics.create({
      data,
    })
  }
}

async function main() {
  console.log('🌱 Seeding database...')

  await createMockTopics('9QyneZSLXF8QRsaCbBFvpz6Sv3IzeSBp')

  console.log('✅ Database seeded successfully.')
}

main()
