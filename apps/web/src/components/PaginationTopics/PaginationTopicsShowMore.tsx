import { Button } from '@/components/ui/button'
import { PaginationTopicsContext } from './PaginationTopicsContext'

export function PaginationTopicsShowMore() {
  const { hasNextPage, fetchNextPage, isFetchingNextPage } =
    PaginationTopicsContext.useSelect(state => state.query)

  return (
    <>
      {hasNextPage && !isFetchingNextPage ? (
        <Button
          onClick={() => fetchNextPage()}
          variant="outline"
          className="mt-12 w-full"
          size="lg"
        >
          Show More
        </Button>
      ) : undefined}
    </>
  )
}
