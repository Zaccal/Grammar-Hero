import FileUpload from '../ui/FileUpload'
import { useFileUpload } from '@/hooks/useFileUpload'

interface CreateTopicFormFileUploadProps {
  className?: string
}

const MAX_FILE_SIZE = 2

export const CreateTopicFormFileUpload = ({
  className,
}: CreateTopicFormFileUploadProps) => {
  const [fileUploadState, fileUploadActions] = useFileUpload({
    accept: 'image/jpeg,image/png,image/jpg',
    maxSize: MAX_FILE_SIZE * 1024 * 1024,
  })
  const { files } = fileUploadState

  const fileName = files[0]?.file.name

  return (
    <FileUpload
      maxSizeMb={MAX_FILE_SIZE}
      options={[fileUploadState, fileUploadActions]}
      className={className}
    />
  )
}
