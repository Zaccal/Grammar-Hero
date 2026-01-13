import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { useUserProvider } from '@/hooks'
import { ChangePasswordForm } from '../ChangePasswordForm'
import SetPasswordForm from '../SetPasswordForm'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { Input } from '../ui/input'
import { Skeleton } from '../ui/skeleton'

// TODO: Change the link path when you will create "Forgot password"

export function EditProfileChangePasswordField() {
  const { data: provider, isLoading, isError, error } = useUserProvider()
  const [open, setOpen] = useState(false)

  if (isLoading) {
    return <Skeleton className="w-full h-10 rounded-md" />
  }
  if (isError) {
    console.error(error)
    return (
      <div className="space-y-2 text-center text-destructive-foreground bg-destructive p-4 rounded-md text-sm">
        <p className="text-sm">Error fetching provider</p>
        <p className="text-sm">Can not change password</p>
      </div>
    )
  }

  if (provider !== 'credential') {
    return (
      <>
        <Dialog open={open} onOpenChange={state => setOpen(state)}>
          <DialogTrigger asChild>
            <Button type="button" variant="outline" fullWidth>
              Set Password
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <SetPasswordForm.Root>
              <SetPasswordForm.Field
                name="password"
                label="Your Dino Password 🦕"
                type="password"
                placeholder="Enter your password"
              />
              <SetPasswordForm.Field
                name="confirmPassword"
                label="Confirm Password 🦕"
                type="password"
                placeholder="Confirm your password"
              />
              <SetPasswordForm.Submit fullWidth>
                Set Password
              </SetPasswordForm.Submit>
            </SetPasswordForm.Root>
          </DialogContent>
        </Dialog>
      </>
    )
  }

  return (
    <Dialog open={open} onOpenChange={state => setOpen(state)}>
      <div className="flex w-full items-center gap-2">
        <Input type="password" disabled value="123345678" />
        <DialogTrigger>
          <Button type="button">Change</Button>
        </DialogTrigger>
      </div>
      <DialogContent className="sm:max-w-md">
        <ChangePasswordForm.Root
          options={{
            onSuccess: () => {
              setOpen(false)
            },
          }}
        >
          <ChangePasswordForm.Field
            type="password"
            label="Current password"
            name="currentPassword"
          />
          <ChangePasswordForm.Field
            type="password"
            label="New password"
            name="newPassword"
          />
          <ChangePasswordForm.Field
            type="password"
            label="Comfirm password"
            name="comfirmPassword"
          />
          <ChangePasswordForm.Submit>Change password</ChangePasswordForm.Submit>
          <div className="flex justify-center">
            <Link className="text-sm text-primary" to="/createTopic">
              Forgot password?
            </Link>
          </div>
        </ChangePasswordForm.Root>
      </DialogContent>
    </Dialog>
  )
}
