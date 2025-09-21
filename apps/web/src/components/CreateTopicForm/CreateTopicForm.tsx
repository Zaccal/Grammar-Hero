import { createContext } from '@/hooks'
import { useForm, type UseFormReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '../ui/form'
import { fileUploadStore } from './store'
import { useFileUploadMutation } from '@/hooks/useFileUploadMutation'
import {
  createTopicFormSchema,
  type CreateTopicFormSchema,
} from '@/schemas/createTopicForm.schema'
import { Button } from '../ui/button'
import { useMutation } from '@tanstack/react-query'
import { trpc } from '@/lib/trpc'
import { toast } from 'sonner'
import { durationValues } from '@/schemas/filter.schema'

interface CreateTopicFormContext {
  form: UseFormReturn<CreateTopicFormSchema>
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
  const file = fileUploadStore.use(state => state.file)

  const { mutateAsync: uploadFile, isError: isFileUploadError } =
    useFileUploadMutation()

  const { mutateAsync: createTopic } = useMutation(
    trpc.topics.create.mutationOptions({
      onError: error => {
        toast.error('Failed to create topic', {
          description: error.message,
        })
      },
    })
  )

  const form = useForm<CreateTopicFormSchema>({
    resolver: zodResolver(createTopicFormSchema),
    defaultValues: {
      title: '',
      shortDescription: '',
      content: '',
      image: '/default.png',
      level: undefined,
      description: '',
      duration: '',
    },
  })

  async function uploadImageHandler() {
    if (!file) return
    await uploadFile(file)
  }

  async function onSubmit(data: CreateTopicFormSchema) {
    await uploadImageHandler()
    if (isFileUploadError) return
    await createTopic({
      ...data,
      durationMin: durationValues[data.duration]!.min,
      durationMax: durationValues[data.duration]!.max,
    })
  }

  return (
    <createTopicFormContext.Provider initialValue={{ form }}>
      <Form {...form}>
        <form className={className} onSubmit={form.handleSubmit(onSubmit)}>
          {children}
          <Button className="fixed bottom-4 right-4 " size={'lg'} type="submit">
            Publish
          </Button>
        </form>
      </Form>
    </createTopicFormContext.Provider>
  )
}
