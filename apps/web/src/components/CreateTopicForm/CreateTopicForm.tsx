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
import { useRef } from 'react'
import type { MDXEditorMethods } from '@mdxeditor/editor'

interface CreateTopicFormContext {
  form: UseFormReturn<CreateTopicFormSchema>
  markdownEditorRef: React.RefObject<MDXEditorMethods | null>
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
  // I control the file upload outside of the form because, file inputs are uncontrolled component
  // and react-hook-form doesn't support them well
  // Also, markdown editor is uncontrolled component
  // So, I control it outside of the form as well, and use the form for validation only for this component
  const file = fileUploadStore.use(state => state.file)
  const markdownEditorRef = useRef<MDXEditorMethods>(null)

  const {
    mutateAsync: uploadFile,
    isError: isFileUploadError,
    isPending: isFileUploadPending,
  } = useFileUploadMutation()

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

  const { mutateAsync: createTopic } = useMutation(
    trpc.topics.create.mutationOptions({
      onError: error => {
        toast.error('Failed to create topic', {
          description: error.message,
        })
      },
      onSuccess: () => {
        toast.success('Thank you for your topic!')
        //  I need markdownEditorRef to be global for reset the editor content
        markdownEditorRef.current?.setMarkdown('')
        fileUploadStore.set({ file: null })
        form.reset()
      },
    })
  )

  async function uploadImageHandler() {
    if (!file) return
    return (await uploadFile(file)).url
  }

  async function onSubmit(data: CreateTopicFormSchema) {
    const image = await uploadImageHandler()
    if (isFileUploadError) return
    await createTopic({
      ...data,
      durationMin: durationValues[data.duration]!.min,
      durationMax: durationValues[data.duration]!.max,
      // If image is undefined, it means that the user didn't upload a new image, so we use the default one from the form
      image: image ?? data.image,
    })
  }

  return (
    <createTopicFormContext.Provider initialValue={{ form, markdownEditorRef }}>
      <Form {...form}>
        <form className={className} onSubmit={form.handleSubmit(onSubmit)}>
          {children}
          <Button
            className="w-[80%] sm:w-auto fixed bottom-4 right-1/2 translate-x-1/2 sm:translate-x-0 sm:right-4  "
            size={'lg'}
            type="submit"
            loading={isFileUploadPending}
          >
            Publish
          </Button>
        </form>
      </Form>
    </createTopicFormContext.Provider>
  )
}
