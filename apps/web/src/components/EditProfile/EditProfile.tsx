import type { UdpateProfileSchema } from '@/schemas/updateProfile.schema'
import type { User } from '@/types/user.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { useAvatarUpload, useUpdateUser } from '@/hooks'
import { udpateProfileSchema } from '@/schemas/updateProfile.schema'

interface EditProfileProps {
  children: React.ReactNode | React.ReactNode[]
  user: User
}

export function EditProfile({ children, user }: EditProfileProps) {
  const form = useForm({
    resolver: zodResolver(udpateProfileSchema),
    defaultValues: {
      displayUsername: user.displayUsername ?? user.username ?? '',
      image: undefined,
    },
  })
  const { mutateAsync: updateUser } = useUpdateUser({
    onSuccess: () => {
      // After a successful update, the avatar field is set to undefined.
      // This disables the Save button, indicating that no changes are pending,
      // so the user cannot click it again.
      // The username field is not reset after saving.
      // Resetting it would restore the previous value only,
      // which breaks the Save button state detection.
      form.setValue('image', undefined)
    },
  })
  const uploadFileHandler = useAvatarUpload(user.image)

  async function submitHandler(data: UdpateProfileSchema) {
    const image = await uploadFileHandler(data.image)

    await updateUser({
      ...data,
      image,
    })
  }

  return (
    <FormProvider {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(submitHandler)}>
        {children}
      </form>
    </FormProvider>
  )
}
