import type { Topic as TopicType } from '@server/routers/topics/topics.types'
import { getReadTime } from '@/utils/getReadTime'
import { TopicsDialog } from '../index'
import { TopicsCard } from './TopicsCard'
import { getTopicImage } from '@/utils/getTopicImage'

interface TopicsDialogCardProps {
  topic: TopicType
}

function TopicsDialogCard({ topic }: TopicsDialogCardProps) {
  return (
    <TopicsDialog.Root topic={topic}>
      <TopicsDialog.Preview>
        <TopicsCard />
      </TopicsDialog.Preview>
      <TopicsDialog.Content>
        <TopicsDialog.Image
          src={getTopicImage(topic.image)}
          alt={topic.title}
          className="w-full max-h-[400px] h-full"
        />
        <div className="p-6">
          <TopicsDialog.Title>{topic.title}</TopicsDialog.Title>
          <TopicsDialog.Subtitle>
            {getReadTime(topic.durationMin, topic.durationMax)}
          </TopicsDialog.Subtitle>
          <TopicsDialog.Description>
            <p className="mt-2 text-sm text-muted-foreground">
              {topic.description}
            </p>

            <TopicsDialog.Actions />
          </TopicsDialog.Description>
        </div>
      </TopicsDialog.Content>
    </TopicsDialog.Root>
  )
}

export default TopicsDialogCard
