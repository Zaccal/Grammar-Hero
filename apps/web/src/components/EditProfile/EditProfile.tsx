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
  const { mutateAsync: updateUser } = useUpdateUser()
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
      <form onSubmit={form.handleSubmit(submitHandler)}>
        {children}
      </form>
    </FormProvider>
  )
}
