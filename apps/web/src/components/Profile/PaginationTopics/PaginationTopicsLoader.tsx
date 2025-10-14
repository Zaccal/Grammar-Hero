import Loader from '@/components/ui/loader'
import { paginationTopicsContext } from './PaginationTopicsContext'

export function PaginationTopicsLoader() {
  const isFetchingNextPage = paginationTopicsContext.useSelect(
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
