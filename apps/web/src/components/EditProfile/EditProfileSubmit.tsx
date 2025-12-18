import type { UdpateProfileSchema } from '@/schemas/updateProfile.schema'
import { useFormContext } from 'react-hook-form'
import { useSession } from '@/hooks'
import { Button } from '../ui/button'

export function EditProfileSubmit() {
  const { data: session } = useSession()
  const form = useFormContext<UdpateProfileSchema>()
  const isAvatarChanged = form.watch('image') !== undefined
  const isNameChanged =
    form.watch('displayUsername') !== session?.user.displayUsername

  const isDisabled = !isAvatarChanged && !isNameChanged

  return (
    <>
      <Button
        type="submit"
        fullWidth
        loading={form.formState.isSubmitting}
        disabled={isDisabled}
      >
        Save
      </Button>
    </>
  )
}
