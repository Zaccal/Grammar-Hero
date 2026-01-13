import type { SetPasswordSchema } from '@/schemas/setPassword.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { FormProvider, useForm } from 'react-hook-form'
import { trpc } from '@/lib/trpc'
import { setPasswordSchema } from '@/schemas/setPassword.schema'

interface SetPasswordFormProps {
  children?: React.ReactNode | React.ReactNode[]
}

export function SetPasswordForm({ children }: SetPasswordFormProps) {
  const { mutateAsync: setPassword } = useMutation(
    trpc.account.setPassword.mutationOptions()
  )
  const form = useForm<SetPasswordSchema>({
    resolver: zodResolver(setPasswordSchema),
    defaultValues: {
      confirmPassword: '',
      password: '',
    },
  })

  async function submitHandler(data: SetPasswordSchema) {
    await setPassword({
      newPassword: data.password,
    })
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
