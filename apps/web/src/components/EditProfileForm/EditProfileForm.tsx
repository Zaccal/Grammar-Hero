import type { UdpateProfileSchema } from '@/schemas/updateProfile.schema'
import type { User } from '@/types/user.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useFileUploadMutation } from '@/hooks'
import { authClient } from '@/lib/auth-client'
import { udpateProfileSchema } from '@/schemas/updateProfile.schema'
import { Form } from '../ui/form'
import { editProfileFormContext } from './EditProfileFormContext'
import { fileUploadStore } from './store'

interface EditProfileFormProps {
  children: React.ReactNode | React.ReactNode[]
  user: User
}

export function EditProfileForm({ children, user }: EditProfileFormProps) {
  const { mutateAsync: uploadFile, isError } = useFileUploadMutation()
  const file = fileUploadStore.use(state => state.file)
  const form = useForm<UdpateProfileSchema>({
    resolver: zodResolver(udpateProfileSchema),
    defaultValues: {
      displayUsername: user.displayUsername ?? '',
    },
  })

  async function uploadHandler() {
    if (!file)
      return null
    return (await uploadFile(file)).url
  }

  async function submitHandler(data: UdpateProfileSchema) {
    const imageUrl = await uploadHandler()
    if (isError)
      return

    await authClient.updateUser({
      displayUsername: data.displayUsername,
      image: imageUrl,
    })
  }

  return (
    <editProfileFormContext.Provider initialValue={{ form, user }}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitHandler)}>{children}</form>
      </Form>
    </editProfileFormContext.Provider>
  )
}
