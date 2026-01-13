import type { ButtonProps } from '../ui/button'
import type { SetPasswordSchema } from '@/schemas/setPassword.schema'
import { useFormContext } from 'react-hook-form'
import { Button } from '../ui/button'

export function SetPasswordFormSubmit(props: ButtonProps) {
  const form = useFormContext<SetPasswordSchema>()

  return (
    <>
      <Button loading={form.formState.isSubmitting} {...props}>
        {props.children}
      </Button>
    </>
  )
}
