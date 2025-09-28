import type { UseFormReturn } from 'react-hook-form'
import type { SignInSchema } from '@/schemas/auth.schema'
import { Link } from '@tanstack/react-router'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '../../ui/button'
import { Input } from '../../ui/input'

interface SignInFormFieldsProps {
  form: UseFormReturn<SignInSchema>
}

function SignInFormFields({ form }: SignInFormFieldsProps) {
  const { isSubmitting } = form.formState
  return (
    <>
      <div className="mt-6 space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              {!form.formState.errors.email && <FormLabel>Email</FormLabel>}
              <FormMessage />
              <FormControl>
                <Input disabled={isSubmitting} {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="gap-1.5">
              <div className="flex items-center justify-between">
                <FormLabel>Password</FormLabel>
                <Button variant="link" asChild size="sm">
                  <Link
                    to="/"
                    className="link intent-info variant-ghost text-sm"
                  >
                    Forgot your Password ?
                  </Link>
                </Button>
              </div>
              <FormControl>
                <Input disabled={isSubmitting} type="password" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button loading={isSubmitting} type="submit" className="w-full">
          Sign In
        </Button>
      </div>
    </>
  )
}

export default SignInFormFields
