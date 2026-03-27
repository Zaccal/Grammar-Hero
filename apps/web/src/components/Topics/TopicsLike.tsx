import { useMutation } from '@tanstack/react-query'
import { useSearch } from '@tanstack/react-router'
import { Heart } from 'lucide-react'
import { toast } from 'sonner'
import { trpc } from '@/lib/trpc'
import { getOptimisticLike, invalidateProfileTopics, invalidateTopics } from '@/utils'
import { Button } from '../ui/button'
import { TopicsContext } from './TopicsContext'

export function TopicsLike() {
  const searchParams = useSearch({
    from: '/',
  })
  const {
    _count: { likes },
    id: topicId,
    isLiked,
  } = TopicsContext.useSelect(state => state)
  const { set: setTopicsContext, value: topicsContextValue } =
    TopicsContext.useSelect()

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

        toast.error('Failed to like the topic. Please try again.')
      },
      onSuccess: () => {
        invalidateTopics(searchParams, topicId)
        invalidateProfileTopics()
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
