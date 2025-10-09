import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { trpc } from '@/lib/trpc'
import { getOptimisticLike } from '@/utils'
import { Button } from '../ui/button'
import HeartLike from '../ui/HeartLike'
import { topicDetailsContext } from './TopicDetailsContext'

export function TopicDetailsLike() {
  const { _count, id, isLiked } = topicDetailsContext.useSelect(state => state)
  const { set, value } = topicDetailsContext.useSelect()
  const { mutate: toggleLike } = useMutation(
    trpc.topics.like.mutationOptions({
      onMutate: () => {
        if (value) {
          getOptimisticLike(set, value)
        }
      },
      onError: () => {
        if (value) {
          getOptimisticLike(set, value)
        }
        toast.error('Failed to like the topic. Please try again.')
      },
    })
  )

  return (
    <Button
      onClick={() => toggleLike({ topicId: id })}
      variant="mutedGhost"
      className={isLiked ? 'hover:bg-red-100' : ''}
      aria-label="like"
    >
      <HeartLike liked={isLiked} />
      <span className={isLiked ? 'text-destructive' : ''}>{_count.likes}</span>
    </Button>
  )
}
