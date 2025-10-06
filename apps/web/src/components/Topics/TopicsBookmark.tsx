import { useMutation } from '@tanstack/react-query'
import { Bookmark } from 'lucide-react'
import { toast } from 'sonner'
import { trpc } from '@/lib/trpc'
import { getOptimisticBookmark } from '@/utils'
import { Button } from '../ui/button'
import { topicsContext } from './TopicsContext'

export function TopicsBookmark() {
  const { _count, isBookmarked, id } = topicsContext.useSelect(state => state)
  const { set, value } = topicsContext.useSelect()

  const { mutate: toggleBookmark } = useMutation(trpc.topics.bookmark.mutationOptions({
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
    }
  }))

  return (
    <>
      <Button onClick={() => toggleBookmark({ topicId: id })} variant={isBookmarked ? 'warning' : 'outline'} aria-label="add to favorites">
        <Bookmark />
        <span>{_count.bookmark}</span>
      </Button>
    </>
  )
}
