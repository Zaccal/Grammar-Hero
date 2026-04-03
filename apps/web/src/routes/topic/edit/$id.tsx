import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { CreateTopicForm } from '@/components/CreateTopicForm'
import { EditTopic } from '@/components/EditTopic'
import ErrorComponent from '@/components/ErrorComponent'
import Loader from '@/components/ui/loader'
import { Separator } from '@/components/ui/separator'
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
        <div className="space-y-4 my-6">
          <EditTopic.Title />
          <EditTopic.ShortDescription />
          <EditTopic.Description />
        </div>
        <div className="flex justify-between items-center">
          <EditTopic.Level />
          <EditTopic.Duration />
        </div>
        <Separator className="my-5" />
        <CreateTopicForm.MarkdownHint>
          We use markdown to format the topic content. You can learn markdown{' '}
          <CreateTopicForm.MarkdownHintLink href="https://www.markdowntutorial.com/">
            here
          </CreateTopicForm.MarkdownHintLink>
        </CreateTopicForm.MarkdownHint>
        <EditTopic.MarkdownEditor className="mt-4" />
        <EditTopic.Publish
          className="w-[80%] sm:w-auto fixed bottom-4 right-1/2 translate-x-1/2 sm:translate-x-0 sm:right-4"
          type="button"
          size="lg"
        >
          Edit Topic
        </EditTopic.Publish>
      </EditTopic.Root>
    </div>
  )
}
