import type { MDXEditorMethods } from '@mdxeditor/editor'
import type { CreateTopicFormSchema } from '@/schemas/createTopicForm.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useFileUploadMutation } from '@/hooks/useFileUploadMutation'
import { CREATE_FORM_ID } from '@/lib/constants'
import { trpc } from '@/lib/trpc'
import { createTopicFormSchema } from '@/schemas/createTopicForm.schema'
import { durationValues } from '@/schemas/filter.schema'
import { invalidateProfileTopics } from '@/utils'
import { Form } from '../ui/form'
import { CreateTopicFormContext } from './CreateTopicFormContext'
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

  const { mutateAsync: uploadFile } = useFileUploadMutation()

  const form = useForm<CreateTopicFormSchema>({
    resolver: zodResolver(createTopicFormSchema),
    defaultValues: {
      title: '',
      shortDescription: '',
      content: '',
      image: '/default.webp',
      level: undefined,
      description: '',
      duration: '',
      exercises: [],
    },
  })

  const { mutateAsync: createTopic } = useMutation(
    trpc.topics.create.mutationOptions({
      onError: () => {
        toast.error('Failed to create topic')
      },
    })
  )

  const { mutateAsync: updateTopic } = useMutation(
    trpc.topics.update.mutationOptions({
      onError: () => {
        toast.error('Failed to update topic image')
      },
    })
  )

  async function uploadImageHandler(topicId: string) {
    if (!file) {
      return
    }
    return (
      await uploadFile({
        file,
        type: 'preview',
        topicId,
      })
    ).url
  }

  async function onSubmit(data: CreateTopicFormSchema) {
    const topicData = {
      ...data,
      durationMin: durationValues[data.duration]!.min,
      durationMax: durationValues[data.duration].max,
    }

    try {
      const topic = await createTopic({
        ...topicData,
        image: '/default.webp',
      })
      const image = await uploadImageHandler(topic.id)

      if (image) {
        await updateTopic({
          topicId: topic.id,
          data: {
            ...topicData,
            image,
          },
        })
      }

      toast.success('Thank you for your topic!')
      markdownEditorRef.current?.setMarkdown('')
      fileUploadStore.set({ file: null })
      form.reset()

      await invalidateProfileTopics()
    }
 finally {
      alertDialogCreateTopicStore.set({
        open: false,
      })
    }
  }

  return (
    <CreateTopicFormContext.Provider
      initialValue={{
        markdownEditorRef,
      }}
    >
      <Form {...form}>
        <form
          id={CREATE_FORM_ID}
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
    </CreateTopicFormContext.Provider>
  )
}
