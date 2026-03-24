import { useIntersectionObserver } from '@/hooks'
import { PaginationTopicsContext } from './PaginationTopicsContext'

interface PaginationTopicsObserverIntersectionProps {
  children?: React.ReactNode | React.ReactNode[]
}

export function PaginationTopicsObserverIntersection({
  children,
}: PaginationTopicsObserverIntersectionProps) {
  const { hasNextPage, fetchNextPage } = PaginationTopicsContext.useSelect(
    state => state.query
  )
  const intersectionObserver = useIntersectionObserver<HTMLDivElement>({
    onChange: ([entry]) => {
      if (entry.isIntersecting && hasNextPage) {
        fetchNextPage()
      }
    },
  })

  return (
    <div>
      {children}
      <div ref={intersectionObserver.ref} className="h-4 w-full"></div>
    </div>
  )
}
