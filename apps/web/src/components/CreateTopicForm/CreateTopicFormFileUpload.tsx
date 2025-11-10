import { UPLOAD_FILE_SIZE_MB } from '@server/routers/upload/constants'
import { useMutationState } from '@tanstack/react-query'
import {
  USE_FILE_UPLOAD_MUTATION_KEY,
  useDidUpdate,
  useFileUpload,
} from '@/hooks/index'
import FileUpload from '../ui/FileUpload'
import { createTopicFormContext } from './CreateTopicFormContext'
import { fileUploadStore } from './store'

interface CreateTopicFormFileUploadProps {
  className?: string
}

export function CreateTopicFormFileUpload({
  className,
}: CreateTopicFormFileUploadProps) {
  const isError =
    useMutationState({
      filters: {
        mutationKey: [USE_FILE_UPLOAD_MUTATION_KEY],
        status: 'error',
      },
    }).length > 0
  const isPending = createTopicFormContext.useSelect(state => state.isPending)

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
