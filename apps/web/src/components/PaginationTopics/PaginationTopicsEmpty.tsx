import { paginationTopicsContext } from './PaginationTopicsContext'

interface PaginationTopicsEmptyProps {
  children: React.ReactNode | React.ReactNode[]
}

export function PaginationTopicsEmpty({
  children,
}: PaginationTopicsEmptyProps) {
  const isEmpty = !paginationTopicsContext.useSelect(
    state => state.query.data?.pages.length
  )
  const isLoading = paginationTopicsContext.useSelect(
    state => state.query.isLoading
  )

  if (!isEmpty || isLoading) {
    return null
  }

  return <>{children}</>
}
