import type { InputProps } from '../ui/input'
import type { SetPasswordSchema } from '@/schemas/setPassword.schema'
import { useFormContext } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'

interface SetPasswordFormFieldProps extends InputProps {
  name: keyof SetPasswordSchema
  label: string
}

export function SetPasswordFormField({
  name,
  label,
  ...props
}: SetPasswordFormFieldProps) {
  const form = useFormContext<SetPasswordSchema>()

  return (
    <>
      <FormField
        name={name}
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormMessage />
            <FormControl>
              <Input
                disabled={form.formState.isSubmitting}
                {...field}
                {...props}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  )
}
