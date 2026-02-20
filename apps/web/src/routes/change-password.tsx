import { createFileRoute, Link } from '@tanstack/react-router'
import { ChangePasswordForm } from '@/components/ChangePasswordForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const Route = createFileRoute('/change-password')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="w-full h-full flex items-center justify-center pt-24">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle>Change password</CardTitle>
          <CardDescription>Enter your old password than new password</CardDescription>
        </CardHeader>
        <CardContent>
          <ChangePasswordForm.Root>
            <ChangePasswordForm.Field name="currentPassword" label="Current password" />
            <ChangePasswordForm.Field name="newPassword" label="New password" />
            <ChangePasswordForm.Field name="comfirmPassword" label="Confirm password" />
            <ChangePasswordForm.Submit>Submit</ChangePasswordForm.Submit>
            <Link to="/forgot-password" className="text-sm text-primary">Forgot password?</Link>
          </ChangePasswordForm.Root>
        </CardContent>
      </Card>
    </div>
  )
}
