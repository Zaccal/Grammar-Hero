import { createFileRoute } from '@tanstack/react-router'
import { CreateTopicForm } from '@/components/CreateTopicForm/index'
import { Separator } from '@/components/ui/separator'
import ensureSession from '@/middleware'

export const Route = createFileRoute('/createTopic')({
  component: RouteComponent,
  loader: ensureSession,
})

function RouteComponent() {
  return (
    <CreateTopicForm.Root className="container mt-10">
      <CreateTopicForm.FileUpload className="mb-6" />
      <div className="space-y-4">
        <CreateTopicForm.Title />
        <CreateTopicForm.ShortDescription />
        <CreateTopicForm.Description />
      </div>

      <div className="mt-6 flex justify-between items-center gap-3">
        <CreateTopicForm.Level />
        <CreateTopicForm.Duration />
      </div>

      <Separator className="my-6" />

      <CreateTopicForm.MarkdownHint>
        We use markdown to format the topic content. You can learn markdown{' '}
        <CreateTopicForm.MarkdownHintLink href="https://www.markdowntutorial.com/">
          here
        </CreateTopicForm.MarkdownHintLink>
      </CreateTopicForm.MarkdownHint>
      <CreateTopicForm.MarkdownEditor className="mt-4" />

      <CreateTopicForm.Publish
        className="w-[80%] sm:w-auto fixed bottom-4 right-1/2 translate-x-1/2 sm:translate-x-0 sm:right-4  "
        size="lg"
        type="button"
      >
        Publish
      </CreateTopicForm.Publish>
    </CreateTopicForm.Root>
  )
}
