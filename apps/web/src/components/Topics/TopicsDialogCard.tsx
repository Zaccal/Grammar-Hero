import type { Topics } from '../../../../server/prisma/generated/client'
import { TopicsCard, TopicsDialog } from './Topics'

interface TopicsDialogCardProps {
  topic: Topics
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
          <TopicsDialog.Subtitle>{topic.duration}</TopicsDialog.Subtitle>
          <TopicsDialog.Description>
            <p className="mt-2 text-sm leading-[1.325rem] text-muted-foreground">
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
