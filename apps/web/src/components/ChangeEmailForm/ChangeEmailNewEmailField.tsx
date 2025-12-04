import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { changeEmailFormContext } from './ChangeEmailContext'

export function ChangeEmailNewEmailField() {
  const form = changeEmailFormContext.useSelect(state => state.form)

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
            <Input placeholder="your new email" {...field} />
          </FormControl>
        </FormItem>
      )}
      />
    </>
  )
}
