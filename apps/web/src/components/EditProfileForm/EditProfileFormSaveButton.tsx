import type { UseFormReturn } from 'react-hook-form'
import type { UdpateProfileSchema } from '@/schemas/updateProfile.schema'
import { useSession } from '@/hooks'
import { Button } from '../ui/button'
import { fileUploadStore } from './store'

interface EditProfileFormSaveButtonProps {
  form: UseFormReturn<UdpateProfileSchema>
}

export function EditProfileFormSaveButton({ form }: EditProfileFormSaveButtonProps) {
  const { file, isDeleted } = fileUploadStore.use(state => state)
  const { data: session } = useSession()
  const user = session?.user

  const displayUsername = form.watch('displayUsername')
  const usernameChanged = displayUsername !== user?.displayUsername
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
