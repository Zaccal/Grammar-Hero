import type { ReactNode } from 'react'
import type { ButtonProps } from '../ui/button'
import type { ChangeEmailSchema } from '@/schemas/changeEmail.schema'
import { useFormContext } from 'react-hook-form'
import { Button } from '../ui/button'

interface ChangeEmailFormSubmitProps extends ButtonProps {
  children?: ReactNode | ReactNode[] | string
}

export function ChangeEmailFormSubmit({ children, ...props }: ChangeEmailFormSubmitProps) {
  const form = useFormContext<ChangeEmailSchema>()

  return (
    <>
      <Button {...props} loading={form.formState.isSubmitting} type="submit" fullWidth>
        {children}
      </Button>
    </>
  )
}
