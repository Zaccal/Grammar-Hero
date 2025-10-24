import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { editProfileFormContext } from './EditProfileFormContext'

export function EditProfileFormDisplayUsername() {
  const form = editProfileFormContext.useSelect(state => state.form)

  return (
    <>
      <FormField
        control={form.control}
        name="displayUsername"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input disabled={form.formState.isSubmitting} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}
