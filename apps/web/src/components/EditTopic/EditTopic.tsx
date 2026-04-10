import type { Topic } from '@server/routers/topics/topics.types'
import type { CreateTopicFormSchema as EditTopicFormSchema } from '@/schemas/createTopicForm.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import lodash from 'lodash'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useFileUploadMutation } from '@/hooks'
import { EDIT_FORM_ID } from '@/lib/constants'
import { trpc } from '@/lib/trpc'
import { createTopicFormSchema as editTopicFormSchema } from '@/schemas/createTopicForm.schema'
import { durationValues } from '@/schemas/filter.schema'
import {
  getServerImage,
  invalidateProfileTopics,
  invalidateTopicId,
} from '@/utils'
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
    duration:
      topic.durationMax == null
        ? '35+ min'
        : `${topic.durationMin.getUTCMinutes()}-${topic.durationMax.getUTCMinutes()} min`,
  }

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
      if (lodash.isEqual(file, form.watch('image'))) {
        return topic.image ?? '/default.png'
      }
      return file
    }

    const exchangeFile = topic.image
      ? topic.image.split('/').at(-1)
      : undefined

    return (
      await uploadFileAsync({
        file,
        exchangeFile,
      })
    ).url
  }

  const { set } = EditTopicContext.useSelect()

  async function onSubmit(data: EditTopicFormSchema) {
    const image = await uploadImageHandler(data.image)
    if (isFileUploadError) {
      return
    }
    await updateTopicAsync({
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
    set(data)
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
