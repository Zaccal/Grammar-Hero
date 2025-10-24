import { Button } from '../ui/button'
import { editProfileFormContext } from './EditProfileFormContext'
import { fileUploadStore } from './store'

export function EditProfileFormSaveButton() {
  const { form, user } = editProfileFormContext.useSelect(state => state)
  const { file, isDeleted } = fileUploadStore.use(state => state)

  const displayUsername = form.watch('displayUsername')
  const usernameChanged = displayUsername !== user.displayUsername
  const newAvatarUploaded = Boolean(file)

  const isDisabled = !usernameChanged && !newAvatarUploaded && !isDeleted

  return (
    <Button
      disabled={isDisabled}
      loading={form.formState.isSubmitting}
      className="mt-8 w-full"
      type="submit"
    >
      Save
    </Button>
  )
}
