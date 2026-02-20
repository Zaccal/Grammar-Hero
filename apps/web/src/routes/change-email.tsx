import { createFileRoute } from '@tanstack/react-router'
import { ChangeEmailForm } from '@/components/ChangeEmailForm'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export const Route = createFileRoute('/change-email')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="w-full h-full flex items-center justify-center pt-24">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle>Change Email</CardTitle>
          <CardDescription>Enter your new email address</CardDescription>
        </CardHeader>
        <CardContent>
          <ChangeEmailForm.Root>
            <ChangeEmailForm.NewEmailField />
            <ChangeEmailForm.Timer />
            <ChangeEmailForm.Submit>Change Email</ChangeEmailForm.Submit>
          </ChangeEmailForm.Root>
        </CardContent>
      </Card>
    </div>
  )
}
