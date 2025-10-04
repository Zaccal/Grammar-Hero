import type { Topic } from '@server/routers/topics/topics.types'
import { useMutation } from '@tanstack/react-query'
import { Heart } from 'lucide-react'
import { trpc } from '@/lib/trpc'
import { Button } from '../ui/button'
import { topicsContext } from './TopicsContext'

export function TopicsLike() {
  const {
    _count: { likes },
    id: topicId,
    isLiked,
  } = topicsContext.useSelect(state => state)
  const { set: setTopicsContext, value: topicsContextValue } =
    topicsContext.useSelect()

  const { mutate: toggleLike } = useMutation(
    trpc.topics.like.mutationOptions({
      onMutate: () => {
        if (topicsContextValue) {
          setOptimisticLike(setTopicsContext, topicsContextValue)
        }
      },
      onError: () => {
        if (topicsContextValue) {
          setOptimisticLike(setTopicsContext, topicsContextValue)
        }
      },
    })
  )

  return (
    <Button
      onClick={() => toggleLike({ topicId })}
      variant={isLiked ? 'destructive' : 'outline'}
      aria-label="like"
    >
      <Heart />
      <span>{likes}</span>
    </Button>
  )
}

function setOptimisticLike(setter: (value: Topic) => void, value: Topic) {
  setter({
    ...value,
    isLiked: !value.isLiked,
    _count: {
      ...value._count,
      likes: value.isLiked
        ? value._count.likes - 1
        : value._count.likes + 1,
    },
  }
  )
}
