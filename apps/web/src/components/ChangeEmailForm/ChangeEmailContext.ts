import type { UseFormReturn } from 'react-hook-form'
import type { ChangeEmailSchema } from '@/schemas/changeEmail.schema'
import { createContext } from '@/hooks'

interface ChangeEmailFormContext {
  form: UseFormReturn<ChangeEmailSchema>
}

export const changeEmailFormContext = createContext<ChangeEmailFormContext>()
