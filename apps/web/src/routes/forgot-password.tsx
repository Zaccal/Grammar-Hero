import type { ChangeEmailSchema as ForgotPasswordSchema } from '@/schemas/changeEmail.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForgotPassword } from '@/hooks'
import { changeEmailSchema as forgotPasswordSchema } from '@/schemas/changeEmail.schema'

export const Route = createFileRoute('/forgot-password')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigation = useNavigate()
  const form = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      newEmail: '',
    },
  })
  const { mutateAsync: forgotPassword, isPending } = useForgotPassword({
    onSuccess: () => {
      navigation({
        to: '/otp-page',
        replace: true,
        search: {
          email: encodeURIComponent(form.getValues().newEmail),
        },
      })
    },
  })

  async function submitHandler(data: ForgotPasswordSchema) {
    await forgotPassword({
      email: data.newEmail,
    })
  }

  return (
    <div className="container mt-32 flex justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Forgot Password</CardTitle>
          <CardDescription>
            Enter your email address below to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="space-y-4"
              onSubmit={form.handleSubmit(submitHandler)}
            >
              <FormField
                control={form.control}
                name="newEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        {...field}
                        placeholder="Enter your email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button fullWidth type="submit" loading={isPending}>
                Enter
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
