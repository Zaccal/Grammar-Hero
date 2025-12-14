import type { UdpateProfileSchema } from '@/schemas/updateProfile.schema'
import type { User } from '@/types/user.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { useFileUploadMutation, useUpdateUser } from '@/hooks'
import { udpateProfileSchema } from '@/schemas/updateProfile.schema'
import { Button } from '../ui/button'

interface EditProfileProps {
  children: React.ReactNode | React.ReactNode[]
  user: User
}

export function EditProfile({ children, user }: EditProfileProps) {
  const form = useForm({
    resolver: zodResolver(udpateProfileSchema),
    defaultValues: {
      displayUsername: user.displayUsername ?? user.username ?? '',
      image: undefined
    }
  })
  const uploadFileMutaion = useFileUploadMutation()
  const { mutateAsync: updateUser } = useUpdateUser()

  // TODO: Move this piece of code to new hook useAvatarUpload
  async function uploadFileHandler(image?: null | File) {
    // TODO: if it is null, it will delete the old file if it exists
    if (!image) { return image }
    return (await uploadFileMutaion.mutateAsync({
      file: image,
      // Here you pass FILE NAME (without path)
      exchangeFile: user.image?.split('/')[2] ?? undefined,
    })).url
  }

  async function submitHandler(data: UdpateProfileSchema) {
   const image = await uploadFileHandler(data.image)

   await updateUser({
    ...data,
    image
   })
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)}>
      {children}
      <Button type="submit" fullWidth>Save</Button>
      </form>
    </FormProvider>
  )
}
