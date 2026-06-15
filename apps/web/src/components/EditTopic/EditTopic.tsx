import type { Topic } from '@server/routers/topics/topics.types'
import type {
  CreateTopicFormSchema as EditTopicFormSchema,
  ExerciseSchema,
} from '@/schemas/createTopicForm.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useFileUploadMutation } from '@/hooks'
import { EDIT_FORM_ID } from '@/lib/constants'
import { trpc } from '@/lib/trpc'
import { createTopicFormSchema as editTopicFormSchema } from '@/schemas/createTopicForm.schema'
import { durationValues } from '@/schemas/filter.schema'
import { invalidateProfileTopics, invalidateTopicId } from '@/utils'
import { isEqual } from '@/utils/isEqual'
import { Form } from '../ui/form'
import { EditTopicContext } from './EditTopicContext'
import { EditTopicAlertDialogStore } from './store'

interface EditTopicProps {
  children?: React.ReactNode | React.ReactNode[]
  topic: Topic
}

export function EditTopic({ children, topic }: EditTopicProps) {
  const initialValues = getEditTopicFormValues(topic)

  return (
    <EditTopicContext.Provider initialValue={initialValues}>
      <EditTopicContent defaultValues={initialValues} topic={topic}>
        {children}
      </EditTopicContent>
    </EditTopicContext.Provider>
  )
}

interface EditTopicContentProps extends EditTopicProps {
  defaultValues: EditTopicFormSchema
}

function EditTopicContent({
  children,
  topic,
  defaultValues,
}: EditTopicContentProps) {
  const form = useForm<EditTopicFormSchema>({
    resolver: zodResolver(editTopicFormSchema),
    defaultValues,
  })

  const { mutateAsync: uploadFileAsync, isError: isFileUploadError } =
    useFileUploadMutation({
      onError: () => {
        toast.error('Failed to upload image')
      },
    })

  const { mutateAsync: updateTopicAsync } = useMutation(
    trpc.topics.update.mutationOptions({
      onError: () => {
        toast.error('Failed to update topic')
      },
      onSuccess: () => {
        toast.success('Topic updated successfully')
      },
    })
  )

  async function uploadImageHandler(file: File | string) {
    if (typeof file === 'string') {
      if (isEqual(file, form.watch('image'))) {
        return topic.image ?? '/default.webp'
      }
      return file
    }

    return (
      await uploadFileAsync({
        file,
        type: 'preview',
        topicId: topic.id,
      })
    ).url
  }

  const { set } = EditTopicContext.useSelect()

  async function onSubmit(data: EditTopicFormSchema) {
    const image = await uploadImageHandler(data.image)
    if (isFileUploadError) {
      return
    }
    const response = await updateTopicAsync({
      topicId: topic.id,
      data: {
        ...data,
        image,
        durationMin: durationValues[data.duration]!.min,
        durationMax: durationValues[data.duration]!.max,
      },
    })
    await invalidateProfileTopics()
    await invalidateTopicId(topic.id)

    const updatedValues = response.topic
      ? getEditTopicFormValues(response.topic)
      : { ...data, image }

    form.reset(updatedValues)
    set(updatedValues)
    EditTopicAlertDialogStore.set(false)
  }

  return (
    <Form {...form}>
      <form id={EDIT_FORM_ID} onSubmit={form.handleSubmit(onSubmit)}>
        {children}
      </form>
    </Form>
  )
}

type EditTopicFormValuesTopic = Pick<
  Topic,
  | 'title'
  | 'shortDescription'
  | 'content'
  | 'image'
  | 'level'
  | 'description'
  | 'durationMin'
  | 'durationMax'
  | 'exercises'
>

function getEditTopicFormValues(
  topic: EditTopicFormValuesTopic
): EditTopicFormSchema {
  return {
    title: topic.title,
    shortDescription: topic.shortDescription,
    content: topic.content,
    image: topic.image ?? '/default.webp',
    level: topic.level,
    description: topic.description,
    duration: getDurationLabel(topic.durationMin, topic.durationMax),
    exercises: topic.exercises as ExerciseSchema[],
  }
}

function getDurationLabel(
  durationMin: Date | string,
  durationMax: Date | string | null
) {
  if (durationMax == null) {
    return '35+ min'
  }

  return `${getUTCMinutes(durationMin)}-${getUTCMinutes(durationMax)} min`
}

function getUTCMinutes(date: Date | string) {
  return new Date(date).getUTCMinutes()
}
