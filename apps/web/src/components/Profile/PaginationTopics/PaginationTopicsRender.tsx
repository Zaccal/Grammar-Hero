import { Link } from '@tanstack/react-router'
import { TopicsDialog } from '@/components/Topics'
import { paginationTopicsContext } from './PaginationTopicsContext'

export function PaginationTopicsRender() {
  const data = paginationTopicsContext.useSelect(state => state.query.data)
  const myTopics = data?.pages.flatMap(p => p.items) ?? []

  return (
    <>
      {myTopics.map(data => (
        <TopicsDialog.Root key={data.id} topic={data}>
          <Link to="/topic/$id" params={{ id: data.id }}>
            <TopicsDialog.PreviewCard />
          </Link>
        </TopicsDialog.Root>
      ))}
    </>
  )
}
