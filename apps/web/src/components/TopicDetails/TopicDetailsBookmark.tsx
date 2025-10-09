import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Bookmark } from '@/components/ui/bookmark'
import { Button } from '@/components/ui/button'
import { trpc } from '@/lib/trpc'
import { getOptimisticBookmark } from '@/utils'
import { topicDetailsContext } from './TopicDetailsContext'

export function TopicDetailsBookmark() {
  const { _count, isBookmarked, id } = topicDetailsContext.useSelect(
    state => state
  )
  const { set, value } = topicDetailsContext.useSelect()

  const { mutate: toggleBookmark } = useMutation(
    trpc.topics.bookmark.mutationOptions({
      onMutate: () => {
        if (value) {
          getOptimisticBookmark(set, value)
        }
      },
      onError: () => {
        if (value) {
          getOptimisticBookmark(set, value)
        }

        toast.error('Failed to bookmark the topic. Please try again.')
      },
    })
  )

  return (
    <Button
      onClick={() => toggleBookmark({ topicId: id })}
      variant="mutedGhost"
      className={isBookmarked ? 'hover:bg-yellow-100' : ''}
    >
      <Bookmark bookmarked={isBookmarked} />
      <span className={isBookmarked ? 'text-yellow-300' : ''}>
        {_count.bookmark}
      </span>
    </Button>
  )
}
