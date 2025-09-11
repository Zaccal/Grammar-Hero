import { Topic } from './Topics'
import { TopicsContent } from './TopicsContent'
import { TopicsImage } from './TopicsImage'
import { TopicsList } from './TopicsList'
import { TopicsPreview } from './TopicsPreview'
import { TopicsTitle } from './TopicsTitle'
import { TopicsSubtitle } from './TopicsSubtitle'
import { TopicsDescription } from './TopicsDescription'
import { TopicsActions } from './TopicsActions'
import { TopicSkeleton } from './TopicsSkeleton'

export const TopicsDialog = {
  Root: Topic,
  List: TopicsList,
  Preview: TopicsPreview,
  Content: TopicsContent,
  Image: TopicsImage,
  Title: TopicsTitle,
  Subtitle: TopicsSubtitle,
  Description: TopicsDescription,
  Actions: TopicsActions,
  Skeleton: TopicSkeleton,
}
