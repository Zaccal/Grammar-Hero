import type { CreateTopicFormSchema as EditTopicFormSchema } from '@/schemas/createTopicForm.schema'
import { UPLOAD_FILE_SIZE_MB } from '@server/routers/upload/constants'
import { useFormContext } from 'react-hook-form'
import { useFileUpload } from '@/hooks'
import { createFileMetaData } from '@/utils'
import FileUpload from '../ui/FileUpload'

export function EditTopicImage() {
  const form = useFormContext<EditTopicFormSchema>()
  const initialImage = createFileMetaData(form.watch('image'))
  const [fileUploadState, fileUploadActions] = useFileUpload({
    accept: 'image/jpeg,image/png,image/jpg',
    maxSize: UPLOAD_FILE_SIZE_MB * 1024 * 1024,
    maxFiles: 1,
    initialFiles: [initialImage],
    onFilesChange: filesPreview => {
      if (!filesPreview.length) {
        return
      }
      const file = filesPreview[0].file as File
      form.setValue('image', file)
    },
    onFilesRemoved: () => {
      form.setValue('image', '/default.webp')
    },
  })

  return (
    <>
      <FileUpload
        options={[fileUploadState, fileUploadActions]}
        maxSizeMb={UPLOAD_FILE_SIZE_MB}
      />
    </>
  )
}
