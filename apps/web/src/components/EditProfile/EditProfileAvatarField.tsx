import type { UdpateProfileSchema } from '@/schemas/updateProfile.schema'
import { UPLOAD_FILE_SIZE_MB } from '@server/routers/upload/constants'
import { useFormContext } from 'react-hook-form'
import { useFileUpload } from '@/hooks'
import { getServerImage } from '@/utils'
import AvatarFileUpload from '../ui/AvatarFileUpload'

interface EditProfileAvatarFieldProps {
  initalState?: string | null
}

export function EditProfileAvatarField({
  initalState,
}: EditProfileAvatarFieldProps) {
  const form = useFormContext<UdpateProfileSchema>()
  const [fileUploadState, fileUploadActions] = useFileUpload({
    accept: 'image/jpeg,image/png,image/jpg',
    maxSize: UPLOAD_FILE_SIZE_MB * 1024 * 1024,
    maxFiles: 1,
    onFilesAdded(addedFiles) {
      const file = addedFiles[0].file as File

      form.setValue('image', file)
    },
    onFilesRemoved() {
      form.setValue('image', null)
    },

    initialFiles: initalState
      ? [
          {
            id: 'INITAL_STATE',
            name: 'inital file',
            size: UPLOAD_FILE_SIZE_MB * 1024 * 1024,
            type: 'image/jpeg,image/png,image/jpg',
            url: getServerImage(initalState),
          },
        ]
      : undefined,
  })

  return (
    <>
      {fileUploadState.errors.map(errorMessage => (
        <p
          className="text-destructive text-sm text-center mb-6"
          key={errorMessage}
        >
          {errorMessage}
        </p>
      ))}
      <AvatarFileUpload
        options={[fileUploadState, fileUploadActions]}
        maxSizeMb={UPLOAD_FILE_SIZE_MB}
      />
    </>
  )
}
