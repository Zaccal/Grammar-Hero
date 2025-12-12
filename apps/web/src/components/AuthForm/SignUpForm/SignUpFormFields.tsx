import type { UseFormReturn } from 'react-hook-form'
import type { SignUpSchema } from '@/schemas/auth.schema'
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface SignUpFormFieldsProps {
  form: UseFormReturn<SignUpSchema>
}

function SignUpFormFields({ form }: SignUpFormFieldsProps) {
  const { errors, isSubmitting } = form.formState
  return (
    <div className="mt-6 space-y-5.5">
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            {errors.username
? (
              <FormMessage />
            )
: (
              <FormLabel>Username</FormLabel>
            )}
            <FormControl>
              <Input disabled={isSubmitting} {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            {errors.email ? <FormMessage /> : <FormLabel>Email</FormLabel>}
            <FormControl>
              <Input disabled={isSubmitting} type="email" {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        name="password"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            {errors.password
? (
              <FormMessage />
            )
: (
              <FormLabel>Passoword</FormLabel>
            )}
            <FormControl>
              <Input disabled={isSubmitting} type="password" {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <Button loading={isSubmitting} type="submit" className="w-full">
        Sign Up{' '}
      </Button>
    </div>
  )
}

export default SignUpFormFields
