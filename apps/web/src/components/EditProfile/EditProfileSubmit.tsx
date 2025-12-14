import type { UdpateProfileSchema } from '@/schemas/updateProfile.schema'
import type { User } from '@/types/user.type'
import { useFormContext } from 'react-hook-form'
import { Button } from '../ui/button'

interface EditProfileSubmitProps {
  user: User
}

export function EditProfileSubmit({ user }: EditProfileSubmitProps) {
  const form = useFormContext<UdpateProfileSchema>()
  const isAvatarChanged = form.watch('image') !== undefined
  const isNameChanged = form.watch('displayUsername') !== user.displayUsername

  const isDisabled = !isAvatarChanged && !isNameChanged

  return (
    <>
      <Button type="submit" fullWidth disabled={isDisabled}>
        Save
      </Button>
    </>
  )
}
