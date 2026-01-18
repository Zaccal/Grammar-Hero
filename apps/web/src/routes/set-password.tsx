import type { SetPasswordOptions } from '@/components/SetPasswordForm/SetPasswordForm'
import { createFileRoute } from '@tanstack/react-router'
import SetPasswordForm from '@/components/SetPasswordForm'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export const Route = createFileRoute('/set-password')({
  component: RouteComponent,
  validateSearch: (
    searchParams: Record<string, unknown>
  ): SetPasswordOptions => {
    const email = searchParams.email as string | undefined
    const otp = searchParams.otp as string | undefined

    if (!email || !otp) {
      throw new Error('Invalid email or otp')
    }

    return {
      email: decodeURIComponent(email),
      otp: decodeURIComponent(otp),
    }
  },
})

function RouteComponent() {
  const params = Route.useSearch()
  return (
    <div className="container">
      <div className="flex flex-col items-center justify-center mt-32">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Set Password</CardTitle>
            <CardDescription>
              Set a new password for your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SetPasswordForm.Root options={params}>
              <SetPasswordForm.Field
                type="password"
                label="New Password"
                name="password"
                placeholder="Enter a new password"
              />
              <SetPasswordForm.Field
                type="password"
                label="Confirm Password"
                name="confirmPassword"
                placeholder="Confirm your new password"
              />
              <SetPasswordForm.Submit fullWidth>
                Set password
              </SetPasswordForm.Submit>
            </SetPasswordForm.Root>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
