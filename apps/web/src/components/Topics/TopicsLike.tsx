import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSearch } from '@tanstack/react-router'
import { Heart } from 'lucide-react'
import { toast } from 'sonner'
import { trpc } from '@/lib/trpc'
import { getOptimisticLike } from '@/utils'
import { Button } from '../ui/button'
import { topicsContext } from './TopicsContext'

export function TopicsLike() {
  const queryClient = useQueryClient()
  const searchParams = useSearch({
    from: '/',
  })
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

        toast.error('Failed to like the topic. Please try again.')
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: trpc.topics.getAll.queryKey(searchParams),
        })
        queryClient.invalidateQueries({
          queryKey: trpc.topics.getById.queryKey(topicId),
        })
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
