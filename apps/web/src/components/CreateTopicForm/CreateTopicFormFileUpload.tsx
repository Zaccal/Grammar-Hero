import FileUpload from '../ui/FileUpload'
import { useFileUpload, useFileUploadMutationState } from '@/hooks/index'
import { UPLOAD_FILE_SIZE_MB } from '@server/routers/upload/constants'
import { fileUploadStore } from './store'

interface CreateTopicFormFileUploadProps {
  className?: string
}

export const CreateTopicFormFileUpload = ({
  className,
}: CreateTopicFormFileUploadProps) => {
  const { isPending, isError } = useFileUploadMutationState()

  const [fileUploadState, fileUploadActions] = useFileUpload({
    accept: 'image/jpeg,image/png,image/jpg',
    maxSize: UPLOAD_FILE_SIZE_MB * 1024 * 1024,
    maxFiles: 1,

    onFilesAdded: addedFiles => {
      const file = addedFiles[0].file as File

      fileUploadStore.set({ file })
    },
  })

  return (
    <>
      {isError && (
        <p className="text-destructive mb-4">Failed to upload file try again</p>
      )}
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
