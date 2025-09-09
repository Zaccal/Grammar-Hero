import type { Topic } from '@server/routers/topics/topics.types'
import { TopicsCard, TopicsDialog } from './Topics'
import { getReadTime } from '@/lib/getReadTime'
interface TopicsDialogCardProps {
  topic: Topic
}

function TopicsDialogCard({ topic }: TopicsDialogCardProps) {
  return (
    <TopicsDialog.Root topic={topic}>
      <TopicsDialog.Preview>
        <TopicsCard />
      </TopicsDialog.Preview>
      <TopicsDialog.Content>
        <TopicsDialog.Image
          src={topic.image}
          alt={topic.title}
          className="w-full max-h-[400px] h-full"
        />
        <div className="p-6">
          <TopicsDialog.Title>{topic.title}</TopicsDialog.Title>
          <TopicsDialog.Subtitle>
            {getReadTime(topic.duration)}
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
