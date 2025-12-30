import type { InputProps } from '../ui/input'
import type { ChangePasswordSchema } from '@/schemas/changePassword.schema'
import { useFormContext } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'

interface ChangePasswordFormFieldProps extends InputProps {
  name: keyof ChangePasswordSchema
  label: string
}

export function ChangePasswordFormField({ name, label, ...props }: ChangePasswordFormFieldProps) {
  const form = useFormContext<ChangePasswordSchema>()

  return (
    <>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input {...field} {...props} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}
