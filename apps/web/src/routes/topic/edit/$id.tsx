import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { EditTopic } from '@/components/EditTopic'
import ErrorComponent from '@/components/ErrorComponent'
import Loader from '@/components/ui/loader'
import { trpc } from '@/lib/trpc'
import ensureSession from '@/middleware'

export const Route = createFileRoute('/topic/edit/$id')({
  component: RouteComponent,
  loader: ensureSession,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const {
    data: topic,
    isLoading,
    isError,
    error,
  } = useQuery(trpc.topics.getById.queryOptions(id))

  if (isLoading) {
    return <Loader />
  }
  if (isError) {
    return <ErrorComponent error={error} />
  }

  return (
    <div className="container pt-10">
      <EditTopic.Root topic={topic!}>
        <EditTopic.Image />
      </EditTopic.Root>
    </div>
  )
}
