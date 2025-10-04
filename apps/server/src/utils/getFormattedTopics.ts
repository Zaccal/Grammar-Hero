import type { TopicPayload } from '@/routers/topics/topics.types'

export function getFormattedTopics(topics: TopicPayload[]) {
  return topics.map(topic => {
    const { likes, ...visibleKeys } = topic
    return {
      ...visibleKeys,
      isLiked: likes.length > 0,
    }
  })
}
