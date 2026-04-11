import type { CreateTopicFormSchema } from '@/schemas/createTopicForm.schema'
import { UPLOAD_FILE_SIZE_MB } from '@server/routers/upload/constants'
import { useFormContext } from 'react-hook-form'
import { useDidUpdate, useFileUpload } from '@/hooks/index'
import FileUpload from '../ui/FileUpload'
import { fileUploadStore } from './store'

interface CreateTopicFormFileUploadProps {
  className?: string
}

export function CreateTopicFormFileUpload({
  className,
}: CreateTopicFormFileUploadProps) {
  const form = useFormContext<CreateTopicFormSchema>()
  const isPending = form.formState.isSubmitting

  const [fileUploadState, fileUploadActions] = useFileUpload({
    accept: 'image/jpeg,image/png,image/jpg',
    maxSize: UPLOAD_FILE_SIZE_MB * 1024 * 1024,
    maxFiles: 1,

    onFilesAdded: addedFiles => {
      const file = addedFiles[0].file as File

      fileUploadStore.set({ file })
    },
  })

  const file = fileUploadStore.use(state => state.file)

  useDidUpdate(() => {
    if (!file) {
      fileUploadActions.clearFiles()
    }
  }, [file])

  return (
    <>
      <div className={isPending ? 'disabled' : ''}>
        <FileUpload
          maxSizeMb={UPLOAD_FILE_SIZE_MB}
          options={[fileUploadState, fileUploadActions]}
          className={className}
        />
      </div>
    </>
  )
}
