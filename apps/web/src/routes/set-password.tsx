import { createFileRoute } from '@tanstack/react-router'
import SetPasswordForm from '@/components/SetPasswordForm'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { SetPasswordRouteStore } from '@/stores/setPasswrodRoute.store'

export const Route = createFileRoute('/set-password')({
  component: RouteComponent,
})

function RouteComponent() {
  const options = SetPasswordRouteStore.use(state => state)
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
            <SetPasswordForm.Root options={options}>
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
