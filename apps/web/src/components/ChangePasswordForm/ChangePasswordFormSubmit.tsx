import type { ButtonProps } from '../ui/button'
import type { ChangePasswordSchema } from '@/schemas/changePassword.schema'
import { useFormContext } from 'react-hook-form'
import { Button } from '../ui/button'

export function ChangePasswordFormSubmit(props: ButtonProps) {
  const form = useFormContext<ChangePasswordSchema>()

  return (
    <>
      <Button {...props} loading={form.formState.isSubmitting} fullWidth>
        {props.children}
      </Button>
    </>
  )
}
