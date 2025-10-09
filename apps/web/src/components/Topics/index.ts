import { Topic } from './Topics'
import { TopicsActions } from './TopicsActions'
import { TopicsBookmark } from './TopicsBookmark'
import { TopicsContent } from './TopicsContent'
import { TopicsDescription } from './TopicsDescription'
import { TopicsImage } from './TopicsImage'
import { TopicsLike } from './TopicsLike'
import { TopicsList } from './TopicsList'
import { TopicsPreview } from './TopicsPreview'
import { TopicsPreviewCard } from './TopicsPreviewCard'
import { TopicSkeleton } from './TopicsSkeleton'
import { TopicsSubtitle } from './TopicsSubtitle'
import { TopicsTitle } from './TopicsTitle'

export const TopicsDialog = {
  Root: Topic,
  List: TopicsList,
  Preview: TopicsPreview,
  PreviewCard: TopicsPreviewCard,
  Content: TopicsContent,
  Image: TopicsImage,
  Title: TopicsTitle,
  Subtitle: TopicsSubtitle,
  Description: TopicsDescription,
  Actions: TopicsActions,
  Skeleton: TopicSkeleton,
  Like: TopicsLike,
  Bookmark: TopicsBookmark,
}
