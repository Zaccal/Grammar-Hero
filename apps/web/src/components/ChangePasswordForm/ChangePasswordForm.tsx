import type { ReactNode } from 'react'
import type { UseChangePassword } from '@/hooks'
import type { ChangePasswordSchema } from '@/schemas/changePassword.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { useChangePassword } from '@/hooks'
import { changePasswordSchema } from '@/schemas/changePassword.schema'
import { Form } from '../ui/form'

interface ChangePasswordFormProps {
  children: ReactNode | ReactNode[]
  options: UseChangePassword
}

export function ChangePasswordForm({ children, options }: ChangePasswordFormProps) {
  const { mutateAsync: changePassword } = useChangePassword(options)
  const form = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      comfirmPassword: '',
      newPassword: '',
      currentPassword: ''
    }
  })

  async function submitHandler(data: ChangePasswordSchema) {
    await changePassword(data)
  }

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form
          onSubmit={event => {
            event.stopPropagation()
            form.handleSubmit(submitHandler)(event)
          }}
          className="space-y-4"
        >
          {children}
        </form>
      </Form>
    </FormProvider>
  )
}
