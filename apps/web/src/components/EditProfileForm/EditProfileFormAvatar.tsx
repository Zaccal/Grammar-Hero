import { UPLOAD_FILE_SIZE_MB } from '@server/routers/upload/constants'
import { useFileUpload } from '@/hooks'
import { getServerImage } from '@/utils'
import AvatarFileUpload from '../ui/AvatarFileUpload'
import { editProfileFormContext } from './EditProfileFormContext'
import { fileUploadStore } from './store'

export function EditProfileFormAvatar() {
  const { form, user } = editProfileFormContext.useSelect(state => state)
  const [fileUploadState, fileUploadActions] = useFileUpload({
    accept: 'image/jpeg,image/png,image/jpg',
    maxSize: UPLOAD_FILE_SIZE_MB * 1024 * 1024,
    maxFiles: 1,
    initialFiles: user.image
      ? [
          {
            id: 'inital-avatar',
            name: 'initial-avatar',
            url: getServerImage(user.image),
            size: UPLOAD_FILE_SIZE_MB * 1024 * 1024,
            type: '',
          },
        ]
      : [],
    onFilesAdded: addedFile => {
      const file = addedFile[0].file as File

      fileUploadStore.set({
        file,
        isDeleted: false,
        isSelected: true
      })
    },
    onFilesRemoved: () => {
      fileUploadStore.set({
        isDeleted: true,
      })
    },
  })

  return (
    <>
      <AvatarFileUpload
        disabled={form.formState.isSubmitting}
        maxSizeMb={UPLOAD_FILE_SIZE_MB}
        className="size-20"
        options={[fileUploadState, fileUploadActions]}
      />
    </>
  )
}
