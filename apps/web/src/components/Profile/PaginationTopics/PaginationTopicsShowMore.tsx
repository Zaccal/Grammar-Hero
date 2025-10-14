import { Button } from '@/components/ui/button'
import { paginationTopicsContext } from './PaginationTopicsContext'

export function PaginationTopicsShowMore() {
  const hasMore = paginationTopicsContext.useSelect(
    state => state.query.hasNextPage
  )
  const fetchNextPage = paginationTopicsContext.useSelect(
    state => state.query.fetchNextPage
  )

  return (
    <>
      {hasMore && (
        <Button
          onClick={() => fetchNextPage()}
          variant="outline"
          className="mt-12 w-full"
          size="lg"
        >
          Show More
        </Button>
      )}
    </>
  )
}
