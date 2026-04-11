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

  const { mutateAsync: uploadFile, isError: isFileUploadError } =
    useFileUploadMutation()

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
      exercises: [
        {
          id: '1',
          question: 'What is the correct translation of ""?',
          answers: [
            {
              id: '1',
              text: 'something',
              isCorrect: true,
            },
            {
              id: '2',
              text: 'something',
              isCorrect: false,
            },
          ],
          explanation:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          hint: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          isMultipleChoice: false,
        },
        {
          id: '2',
          question: 'Why do we use this form?',
          answers: [
            {
              id: '1',
              text: 'something',
              isCorrect: true,
            },
            {
              id: '2',
              text: 'something',
              isCorrect: false,
            },
          ],
          explanation:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          hint: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          isMultipleChoice: true,
        },
      ],
    },
  })

  const { mutateAsync: createTopic } = useMutation(
    trpc.topics.create.mutationOptions({
      onError: () => {
        toast.error('Failed to create topic')
      },
      onSuccess: async () => {
        toast.success('Thank you for your topic!')
        markdownEditorRef.current?.setMarkdown('')
        fileUploadStore.set({ file: null })
        form.reset()

        await invalidateProfileTopics()
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
      durationMax: durationValues[data.duration].max,
      image: image ?? '/default.png',
    })
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
