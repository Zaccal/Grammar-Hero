import type { MDXEditorMethods } from '@mdxeditor/editor'
import type { CreateTopicFormSchema } from '@/schemas/createTopicForm.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useFileUploadMutation } from '@/hooks/useFileUploadMutation'
import { FORM_ID } from '@/lib/constants'
import { queryClient, trpc } from '@/lib/trpc'
import { createTopicFormSchema } from '@/schemas/createTopicForm.schema'
import { durationValues } from '@/schemas/filter.schema'
import { Form } from '../ui/form'
import { createTopicFormContext } from './CreateTopicFormContext'
import { alertDialogCreateTopicStore, fileUploadStore } from './store'

interface CreateTopicFormProps {
  children: React.ReactNode
  className?: string
}

export function CreateTopicForm({ children, className }: CreateTopicFormProps) {
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

  const { mutateAsync: createTopic, isPending: isCreatingTopicPending } =
    useMutation(
      trpc.topics.create.mutationOptions({
        onError: error => {
          toast.error('Failed to create topic', {
            description: error.message,
          })
        },
        onSuccess: () => {
          toast.success('Thank you for your topic!')
          markdownEditorRef.current?.setMarkdown('')
          fileUploadStore.set({ file: null })
          form.reset()

          queryClient.invalidateQueries({
            queryKey: [trpc.topics.getAll.queryKey],
          })
        },
        onSettled: () => {
          alertDialogCreateTopicStore.set({
            open: false,
          })
        },
      })
    )

  async function uploadImageHandler() {
    if (!file) {
      return
    }
    return (await uploadFile(file)).url
  }

  async function onSubmit(data: CreateTopicFormSchema) {
    const image = await uploadImageHandler()
    if (isFileUploadError) {
      return
    }
    await createTopic({
      ...data,
      durationMin: durationValues[data.duration]!.min,
      durationMax: durationValues[data.duration]!.max,
      image: image ?? data.image,
    })
  }

  return (
    <createTopicFormContext.Provider
      initialValue={{
        form,
        markdownEditorRef,
        isPending: isCreatingTopicPending || isFileUploadPending,
      }}
    >
      <Form {...form}>
        <form
          id={FORM_ID}
          className={className}
          onSubmit={form.handleSubmit(onSubmit, () => {
            alertDialogCreateTopicStore.set({
              open: false,
            })
          })}
        >
          {children}
        </form>
      </Form>
    </createTopicFormContext.Provider>
  )
}
