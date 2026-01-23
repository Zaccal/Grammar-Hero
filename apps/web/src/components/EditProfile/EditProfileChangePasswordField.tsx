import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { ChangePasswordForm } from '../ChangePasswordForm'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { Input } from '../ui/input'

interface EditProfileChangePasswordFieldProps {
  providerId: string
}

export function EditProfileChangePasswordField({
  providerId,
}: EditProfileChangePasswordFieldProps) {
  const [open, setOpen] = useState(false)

  if (providerId !== 'credential') {
    return null
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
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
        </ChangePasswordForm.Root>
      </DialogContent>
    </Dialog>
  )
}
