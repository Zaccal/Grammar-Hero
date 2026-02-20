import type { UseChangeEmailProps } from '@/hooks/useChangeEmail'
import type { ChangeEmailSchema } from '@/schemas/changeEmail.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { useChangeEmail } from '@/hooks/useChangeEmail'
import { useTimer } from '@/hooks/useTimer/useTimer'
import { cn } from '@/lib/utils'
import { changeEmailSchema } from '@/schemas/changeEmail.schema'
import { Form } from '../ui/form'
import { ChangeEmailFormStore } from './ChangeEmailFormStore'

interface ChangeEmailFormProps {
  children?: React.ReactNode | React.ReactNode[]
  className?: string
  options?: UseChangeEmailProps
}

export function ChangeEmailForm({
  children,
  className,
  options,
}: ChangeEmailFormProps) {
  const timer = useTimer(60, {
    immediately: false,
  })
  const changeEmailMutation = useChangeEmail({
    ...options,
    onSuccess: () => {
      timer.start()
      ChangeEmailFormStore.set(timer)
      options?.onSuccess?.()
    },
  })
  const form = useForm<ChangeEmailSchema>({
    resolver: zodResolver(changeEmailSchema),
    defaultValues: {
      newEmail: '',
    },
  })

  async function sumbitHandler(data: ChangeEmailSchema) {
    await changeEmailMutation.mutateAsync(data.newEmail)
  }

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form
          className={cn('space-y-4', className)}
          onSubmit={event => {
            event.stopPropagation()
            form.handleSubmit(sumbitHandler)(event)
          }}
        >
          {children}
        </form>
      </Form>
    </FormProvider>
  )
}
