import type { Topic } from '@server/routers/topics/topics.types'
import { TopicDetailsContext } from './TopicDetailsContext'

interface TopicDetailsProps {
  topic: Topic
  children: React.ReactNode
  className?: string
}

export function TopicDetailsRoot({
  topic,
  children,
  className,
}: TopicDetailsProps) {
  return (
    <TopicDetailsContext.Provider initialValue={topic}>
      <div className={className}>{children}</div>
    </TopicDetailsContext.Provider>
  )
}
