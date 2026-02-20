import type { ReactNode } from 'react'
import type { ButtonProps } from '../ui/button'
import type { ChangeEmailSchema } from '@/schemas/changeEmail.schema'
import { useFormContext } from 'react-hook-form'
import { Button } from '../ui/button'
import { ChangeEmailFormStore } from './ChangeEmailFormStore'

interface ChangeEmailFormSubmitProps extends ButtonProps {
  children?: ReactNode | ReactNode[] | string
}

export function ChangeEmailFormSubmit({
  children,
  ...props
}: ChangeEmailFormSubmitProps) {
  const form = useFormContext<ChangeEmailSchema>()
  const timerActive = ChangeEmailFormStore.use(state =>
    state ? state.active : false
  )

  return (
    <>
      <Button
        {...props}
        loading={form.formState.isSubmitting}
        disabled={form.formState.isSubmitting || timerActive}
        type="submit"
        fullWidth
      >
        {children}
      </Button>
    </>
  )
}
