import type { UseChangeEmailProps } from '@/hooks/useChangeEmail'
import type { ChangeEmailSchema } from '@/schemas/changeEmail.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useChangeEmail } from '@/hooks/useChangeEmail'
import { cn } from '@/lib/utils'
import { changeEmailSchema } from '@/schemas/changeEmail.schema'
import { Button } from '../ui/button'
import { Form } from '../ui/form'
import { changeEmailFormContext } from './ChangeEmailContext'

interface ChangeEmailFormProps {
  children?: React.ReactNode | React.ReactNode[]
  className?: string
  options?: UseChangeEmailProps
}

export function ChangeEmailForm({ children, className, options }: ChangeEmailFormProps) {
  const changeEmailMutation = useChangeEmail(options)
  const form = useForm<ChangeEmailSchema>({
    resolver: zodResolver(changeEmailSchema),
    defaultValues: {
      newEmail: '',
    }
  })

  async function sumbitHandler(data: ChangeEmailSchema) {
    await changeEmailMutation.mutateAsync(data.newEmail)
  }

  return (
    <changeEmailFormContext.Provider initialValue={{ form }}>
      <form
        className={cn('space-y-4', className)}
        onSubmit={event => {
          event.stopPropagation()
          form.handleSubmit(sumbitHandler)(event)
        }}
      >
        <Form {...form}>
          {children}
          <Button loading={form.formState.isSubmitting} type="submit" fullWidth>Change Email</Button>
        </Form>
      </form>
    </changeEmailFormContext.Provider>
  )
}
