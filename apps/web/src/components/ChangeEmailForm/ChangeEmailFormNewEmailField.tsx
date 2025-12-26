import type { InputProps } from '../ui/input'
import type { ChangeEmailSchema } from '@/schemas/changeEmail.schema'
import { useFormContext } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'

export function ChangeEmailFormNewEmailField(props: InputProps) {
  const form = useFormContext<ChangeEmailSchema>()

  return (
    <>
      <FormField
        control={form.control}
        name="newEmail"
        render={({ field }) => (
          <FormItem>
            <FormLabel>New Email</FormLabel>
            <FormMessage />
            <FormControl>
              <Input placeholder="your new email" {...props} {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  )
}
