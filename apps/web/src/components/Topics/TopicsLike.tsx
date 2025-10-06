import { useMutation } from '@tanstack/react-query'
import { Heart } from 'lucide-react'
import { trpc } from '@/lib/trpc'
import { getOptimisticLike } from '@/utils'
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
          getOptimisticLike(setTopicsContext, topicsContextValue)
        }
      },
      onError: () => {
        if (topicsContextValue) {
          getOptimisticLike(setTopicsContext, topicsContextValue)
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
