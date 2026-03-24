import type { PaginationTopicsContextProps } from './PaginationTopicsContext'
import { useDidUpdate } from '@/hooks'
import { PaginationTopicsContext } from './PaginationTopicsContext'

interface PaginationTopicsProps extends PaginationTopicsContextProps {
  children?: React.ReactElement | React.ReactElement[]
}

function Container({ query, children }: PaginationTopicsProps) {
  const { set } = PaginationTopicsContext.useSelect()

  useDidUpdate(() => {
    set({ query })
  }, [query])

  return <>{children}</>
}

export function PaginationTopics(props: PaginationTopicsProps) {
  return (
    <PaginationTopicsContext.Provider initialValue={{ query: props.query }}>
      <Container {...props} />
    </PaginationTopicsContext.Provider>
  )
}
