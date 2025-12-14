import type { UdpateProfileSchema } from '@/schemas/updateProfile.schema'
import { useFormContext } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'

function EditProfileNameField() {
  const form = useFormContext<UdpateProfileSchema>()

  return (
    <>
      <FormField
        control={form.control}
        name="displayUsername"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormMessage />
            <FormControl>
              <Input placeholder="Enter your username" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  )
}

export default EditProfileNameField
