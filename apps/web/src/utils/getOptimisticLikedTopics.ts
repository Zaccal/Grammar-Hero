import type { Topics } from '@server/routers/topics/topics.types'

export function getOptimisticLikedTopics(topics: Topics, topicId: string) {
  return topics.map(data => {
    if (data.id !== topicId)
      return data

    return {
      ...data,
      isLiked: !data.isLiked,
      _count: {
        ...data._count,
        likes: data.isLiked ? data._count.likes - 1 : data._count.likes + 1,
      },
    }
  })
}
