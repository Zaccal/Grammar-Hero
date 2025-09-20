import FileUpload from '../ui/FileUpload'
import { useFileUpload } from '@/hooks/useFileUpload'
import { UPLOAD_FILE_SIZE_MB } from '@server/routers/upload/constants'

interface CreateTopicFormFileUploadProps {
  className?: string
}

export const CreateTopicFormFileUpload = ({
  className,
}: CreateTopicFormFileUploadProps) => {
  const [fileUploadState, fileUploadActions] = useFileUpload({
    accept: 'image/jpeg,image/png,image/jpg',
    maxSize: UPLOAD_FILE_SIZE_MB * 1024 * 1024,
    maxFiles: 1,
  })
  const { files } = fileUploadState

  return (
    <FileUpload
      maxSizeMb={UPLOAD_FILE_SIZE_MB}
      options={[fileUploadState, fileUploadActions]}
      className={className}
    />
  )
}
