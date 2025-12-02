import type { UseFormReturn } from 'react-hook-form'
import type { OtpFormSchema } from '@/schemas/otpForm.schema'
import { createContext } from '@/hooks'

interface OtpCardContext {
  form: UseFormReturn<OtpFormSchema>
}

export const otpCardContext = createContext<OtpCardContext>()
