import { CreateTopicForm } from '@/components/CreateTopicForm/index'
import { Separator } from '@/components/ui/separator'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/createTopic')({
  component: RouteComponent,
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

      <div className="mt-6 flex items-center gap-3">
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
      <CreateTopicForm.MarkdownEditor
        className="mt-4"
        markdown=""
        editorRef={null}
      />
    </CreateTopicForm.Root>
  )
}
