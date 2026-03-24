import { PaginationTopicsContext } from './PaginationTopicsContext'

interface PaginationTopicsEmptyProps {
  children: React.ReactNode | React.ReactNode[]
}

export function PaginationTopicsEmpty({
  children,
}: PaginationTopicsEmptyProps) {
  const pages = PaginationTopicsContext.useSelect(
    state => state.query.data?.pages[0].items
  )
  const isLoading = PaginationTopicsContext.useSelect(
    state => state.query.isLoading
  )
  const isEmpty = pages && pages.length === 0

  if (!isLoading) {
    if (isEmpty) {
      return <>{children}</>
    }
  }

  return null
}
