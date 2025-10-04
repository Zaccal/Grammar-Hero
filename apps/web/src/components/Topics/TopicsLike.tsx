import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Heart } from 'lucide-react'
import { trpc } from '@/lib/trpc'
import { getOptimisticLikedTopics } from '@/utils/getOptimisticLikedTopics'
import { Button } from '../ui/button'
import { topicsContext } from './TopicsContext'

export function TopicsLike() {
  const {
    _count: { likes },
    id: topicId,
    isLiked,
    searchParams,
  } = topicsContext.useSelect(state => state)
  const { set: setTopicsContext, value: topicsContextValue } =
    topicsContext.useSelect()

  const queryClient = useQueryClient()
  const getAllQuerykey = trpc.topics.getAll.queryKey(searchParams)

  const { mutate: toggleLike } = useMutation(
    trpc.topics.like.mutationOptions({
      onMutate: async ({ topicId }) => {
        await queryClient.cancelQueries({ queryKey: getAllQuerykey })
        const previousData = queryClient.getQueryData(getAllQuerykey)

        queryClient.setQueryData(getAllQuerykey, oldData =>
          getOptimisticLikedTopics(oldData ?? [], topicId))

        if (topicsContextValue) {
          setTopicsContext({
            ...topicsContextValue,
            isLiked: !topicsContextValue.isLiked,
            _count: {
              ...topicsContextValue._count,
              likes: topicsContextValue.isLiked
                ? topicsContextValue._count.likes - 1
                : topicsContextValue._count.likes + 1,
            },
          })
        }

        return { previousData }
      },

      onError: (_err, _variables, context) => {
        if (context?.previousData)
          queryClient.setQueryData(getAllQuerykey, context.previousData)
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
