import ErrorComponent from '@/components/ErrorComponent'
import { TopicDetails } from '@/components/TopicDetails/TopicDetails'
import Loader from '@/components/ui/loader'
import { Separator } from '@/components/ui/separator'
import { trpc } from '@/utils/trpc'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/topic/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const { data, isLoading, isError, error } = useQuery(
    trpc.topics.getById.queryOptions(id)
  )

  if (isLoading) return <Loader />
  if (isError) return <ErrorComponent error={error} />

  return (
    <TopicDetails.Root topic={data!} className="container py-40">
      <TopicDetails.Header />
      <Separator className="my-3" />
      <TopicDetails.Actions />
      <Separator className="my-3" />
      <TopicDetails.Image />
      <TopicDetails.Content className="!mt-24">
        {data!.content}
      </TopicDetails.Content>
    </TopicDetails.Root>
  )
}
