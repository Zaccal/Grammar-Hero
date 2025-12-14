import type { UdpateProfileSchema } from '@/schemas/updateProfile.schema'
import type { User } from '@/types/user.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useFileUploadMutation, useUpdateUser } from '@/hooks'
import { udpateProfileSchema } from '@/schemas/updateProfile.schema'
import { Form } from '../ui/form'
import { editProfileFormContext } from './EditProfileFormContext'
import { EditProfileFormSaveButton } from './EditProfileFormSaveButton'
import { fileUploadStore } from './store'

interface EditProfileFormProps {
  children: React.ReactNode | React.ReactNode[]
  user: User
}

export function EditProfileForm({ children, user }: EditProfileFormProps) {
  const { mutateAsync: uploadFile, isError } = useFileUploadMutation()
  const { file, isDeleted, isSelected } = fileUploadStore.use(state => state)
  const form = useForm<UdpateProfileSchema>({
    resolver: zodResolver(udpateProfileSchema),
    defaultValues: {
      displayUsername: user.displayUsername ?? '',
    },
  })
  const { mutateAsync: updateUser } = useUpdateUser()

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
    let image

    if (isDeleted) {
      image = null
    }

    if (isSelected && file && !isDeleted) {
      const imageUrl = await uploadHandler()
      if (isError) {
       toast.error('Error uploading image')
       return
      }
      image = imageUrl
    }

    await updateUser({
      displayUsername: data.displayUsername,
    ...(image !== undefined && { image })
     })
  }

  return (
    <editProfileFormContext.Provider initialValue={{ form, user }}>
      <form onSubmit={form.handleSubmit(submitHandler)}>
        <Form {...form}>{children}</Form>
        <EditProfileFormSaveButton form={form} />
      </form>
    </editProfileFormContext.Provider>
  )
}
