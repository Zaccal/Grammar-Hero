import type { UseFormReturn } from 'react-hook-form'
import type { UdpateProfileSchema } from '@/schemas/updateProfile.schema'
import type { User } from '@/types/user.type'
import { createContext } from '@/hooks'

interface EditProfileFormContext {
  form: UseFormReturn<UdpateProfileSchema>
  user: User
}

export const editProfileFormContext = createContext<EditProfileFormContext>()
