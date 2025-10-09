import type { Topic } from '@server/routers/topics/topics.types'

export function getOptimisticBookmark(
  setter: (value: Topic) => void,
  value: Topic
) {
  return setter({
    ...value,
    isBookmarked: !value.isBookmarked,
    _count: {
      ...value._count,
      bookmark: value.isBookmarked
        ? value._count.bookmark - 1
        : value._count.bookmark + 1,
    },
  })
}
