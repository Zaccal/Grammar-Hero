import { createContext } from '@/hooks'
import { useForm, type UseFormReturn } from 'react-hook-form'
import {
  topicCreateSchema,
  type TopicCreateSchema,
} from '@server/schemas/topics.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '../ui/form'

interface CreateTopicFormContext {
  form: UseFormReturn<TopicCreateSchema>
}

export const createTopicFormContext = createContext<CreateTopicFormContext>()

interface CreateTopicFormProps {
  children: React.ReactNode
  className?: string
}

export const CreateTopicForm = ({
  children,
  className,
}: CreateTopicFormProps) => {
  const form = useForm<TopicCreateSchema>({
    resolver: zodResolver(topicCreateSchema),
    defaultValues: {
      title: '',
      shortDescription: '',
      content: '',
      image: '',
      level: 'Basic',
      description: '',
      durationMin: '',
      durationMax: '',
    },
  })

  function onSubmit(data: TopicCreateSchema) {
    console.log(data)
  }

  return (
    <createTopicFormContext.Provider initialValue={{ form }}>
      <Form {...form}>
        <form className={className} onSubmit={form.handleSubmit(onSubmit)}>
          {children}
        </form>
      </Form>
    </createTopicFormContext.Provider>
  )
}
