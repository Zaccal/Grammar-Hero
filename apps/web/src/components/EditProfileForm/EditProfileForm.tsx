import type { UdpateProfileSchema } from '@/schemas/updateProfile.schema'
import type { User } from '@/types/user.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { sessionQueryKey, useFileUploadMutation, useUpdateUser } from '@/hooks'
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
  const queryClient = useQueryClient()
  const file = fileUploadStore.use(state => state.file)
  const form = useForm<UdpateProfileSchema>({
    resolver: zodResolver(udpateProfileSchema),
    defaultValues: {
      displayUsername: user.displayUsername ?? '',
    },
  })
  const {
    mutateAsync: updateUser,
    isError: isUpdateUserError,
    error: updateUserError,
  } = useUpdateUser()

  async function uploadHandler() {
    if (!file) {
      return null
    }
    return (
      await uploadFile({
        file,
        exchangeFile: user.image?.split('/')[2] ?? undefined,
      })
    ).url
  }

  async function submitHandler(data: UdpateProfileSchema) {
    const imageUrl = await uploadHandler()
    if (isError) {
      toast.error('Error uploading image')
      return
    }

    await updateUser({
      displayUsername: data.displayUsername,
      image: imageUrl,
    })

    if (isUpdateUserError) {
      toast.error(updateUserError?.message || 'Error updating profile')
    }

    queryClient.invalidateQueries({
      queryKey: sessionQueryKey
    })
    toast.success('Profile updated successfully')
  }

  return (
    <editProfileFormContext.Provider initialValue={{ form, user }}>
      <form onSubmit={form.handleSubmit(submitHandler)}>
        <Form {...form}>
          {children}
        </Form>
      </form>
    </editProfileFormContext.Provider>
  )
}
