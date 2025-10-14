import type { PaginationTopicsContext } from './PaginationTopicsContext'
import { useDidUpdate } from '@/hooks'
import { paginationTopicsContext } from './PaginationTopicsContext'

interface PaginationTopicsProps extends PaginationTopicsContext {
  children?: React.ReactElement | React.ReactElement[]
}

function Container({ query, children }: PaginationTopicsProps) {
  const { set } = paginationTopicsContext.useSelect()

  useDidUpdate(() => {
    set({ query })
  }, [query])

  return <>{children}</>
}

export function PaginationTopics(props: PaginationTopicsProps) {
  return (
    <paginationTopicsContext.Provider initialValue={{ query: props.query }}>
      <Container {...props} />
    </paginationTopicsContext.Provider>
  )
}
