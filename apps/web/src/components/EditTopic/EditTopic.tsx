import type { Topic } from '@server/routers/topics/topics.types'
import type { CreateTopicFormSchema as EditTopicFormSchema } from '@/schemas/createTopicForm.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { EDIT_FORM_ID } from '@/lib/constants'
import { createTopicFormSchema as editTopicFormSchema } from '@/schemas/createTopicForm.schema'
import { getServerImage } from '@/utils'
import { Form } from '../ui/form'
import { EditTopicContext } from './EditTopicContext'
import { EditTopicAlertDialogStore } from './store'

interface EditTopicProps {
  children?: React.ReactNode | React.ReactNode[]
  topic: Topic
}

export function EditTopic({ children, topic }: EditTopicProps) {
  const initialValues = {
    title: topic.title,
    shortDescription: topic.shortDescription,
    content: topic.content,
    image: getServerImage(topic.image),
    level: topic.level,
    description: topic.description,
    duration: `${topic.durationMin.getMinutes()}-${topic.durationMax.getMinutes()} min`,
  }

  const form = useForm<EditTopicFormSchema>({
    resolver: zodResolver(editTopicFormSchema),
    defaultValues: initialValues,
  })

  async function onSubmit(_data: EditTopicFormSchema) {}

  return (
    <EditTopicContext.Provider initialValue={initialValues}>
      <Form {...form}>
        <form
          id={EDIT_FORM_ID}
          onSubmit={form.handleSubmit(onSubmit, () => {
            EditTopicAlertDialogStore.set(false)
          })}
        >
          {children}
        </form>
      </Form>
    </EditTopicContext.Provider>
  )
}
