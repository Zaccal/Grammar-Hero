import Loader from '@/components/ui/loader'
import { PaginationTopicsContext } from './PaginationTopicsContext'

export function PaginationTopicsLoader() {
  const isFetchingNextPage = PaginationTopicsContext.useSelect(
    state => state.query.isFetchingNextPage
  )

  return (
    <>
      {isFetchingNextPage && (
        <div className="flex flex-col items-center gap-3">
          <Loader />
          <p>Loading...</p>
        </div>
      )}
    </>
  )
}
