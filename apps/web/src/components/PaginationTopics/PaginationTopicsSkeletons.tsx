import { TopicsDialog } from '@/components/Topics'
import { getDummyArray } from '@/utils'
import { paginationTopicsContext } from './PaginationTopicsContext'

export function PaginationTopicsSkeletons() {
  const isLoading = paginationTopicsContext.useSelect(
    state => state.query.isLoading
  )

  return (
    <>
      {isLoading &&
        getDummyArray(6).map(value => <TopicsDialog.Skeleton key={value} />)}
    </>
  )
}
