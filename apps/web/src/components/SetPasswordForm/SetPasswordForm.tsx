import type { SetPasswordSchema } from '@/schemas/setPassword.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useForgotPassword } from '@/hooks'
import { authClient } from '@/lib/auth-client'
import { setPasswordSchema } from '@/schemas/setPassword.schema'

interface SetPasswordOptions {
  email: string
  otp: string
}

interface SetPasswordFormProps {
  children?: React.ReactNode | React.ReactNode[]
  options: SetPasswordOptions
}

export function SetPasswordForm({ children, options }: SetPasswordFormProps) {
  const navigate = useNavigate()
  const form = useForm<SetPasswordSchema>({
    resolver: zodResolver(setPasswordSchema),
    defaultValues: {
      confirmPassword: '',
      password: '',
    },
  })
  const { mutate: forgotPassword } = useForgotPassword({
    onSuccess: () => {
      navigate({
        to: '/otp-page',
        replace: true,
        search: {
          email: options.email,
        },
      })
    },
  })

  async function submitHandler(data: SetPasswordSchema) {
    const { data: response, error } = await authClient.emailOtp.resetPassword({
      email: options.email,
      otp: options.otp,
      password: data.password,
    })

    if (error) {
      if (error.code === 'INVALID_OTP' || error.code === 'OTP_EXPIRED') {
        toast.error(error.message, {
          action: {
            label: 'Resend OTP',
            onClick: () => forgotPassword({ email: options.email }),
          },
        })
        return
      }

      toast.error('Something went wrong', {
        description: error.message,
      })
    }

    if (response?.success) {
      navigate({
        to: '/',
        replace: true,
      })
      toast.success('Password reset successfully')
    }
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={event => {
          event.stopPropagation()
          form.handleSubmit(submitHandler)(event)
        }}
        className="space-y-6"
      >
        {children}
      </form>
    </FormProvider>
  )
}
