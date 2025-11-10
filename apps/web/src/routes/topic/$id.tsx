import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import ErrorComponent from '@/components/ErrorComponent'
import { TopicDetails } from '@/components/TopicDetails/index'
import Loader from '@/components/ui/loader'
import { Separator } from '@/components/ui/separator'
import { trpc } from '@/lib/trpc'
import ensureSession from '@/middleware'

export const Route = createFileRoute('/topic/$id')({
  component: RouteComponent,
  loader: ensureSession,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const { data, isLoading, isError, error } = useQuery(
    trpc.topics.getById.queryOptions(id)
  )

  if (isLoading) {
    return <Loader />
  }
  if (isError) {
    return <ErrorComponent error={error} />
  }

  // after push to topic page remove overflow-hidden from the body
  // because the user pushed from TopicsDialogCard and it has overflow-hidden, that does not removed after push
  document.body.classList.remove('overflow-hidden')

  return (
    <TopicDetails.Root topic={data!} className="container py-20">
      <TopicDetails.Header />
      <Separator className="my-3" />
      <TopicDetails.Actions>
        <div>
          <TopicDetails.Like />
          <TopicDetails.Bookmark />
        </div>
        <TopicDetails.Dropdown>
          <TopicDetails.DropdownContentProtected>
            <TopicDetails.Edit />
            <TopicDetails.Delete />
          </TopicDetails.DropdownContentProtected>
          <TopicDetails.DropdownContentPublic>
            <TopicDetails.CopyLink />
            <TopicDetails.Share />
            <TopicDetails.Report />
          </TopicDetails.DropdownContentPublic>
        </TopicDetails.Dropdown>
      </TopicDetails.Actions>
      <Separator className="my-3" />
      <TopicDetails.Image />
      <TopicDetails.Content className="!mt-12">
        {data?.content}
      </TopicDetails.Content>
    </TopicDetails.Root>
  )
}
