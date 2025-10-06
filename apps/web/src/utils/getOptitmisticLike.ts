import type { Topic } from '@server/routers/topics/topics.types'

export function getOptimisticLike(
  setter: (value: Topic) => void,
  value: Topic
) {
  setter({
    ...value,
    isLiked: !value.isLiked,
    _count: {
      ...value._count,
      likes: value.isLiked ? value._count.likes - 1 : value._count.likes + 1,
    },
  })
}
