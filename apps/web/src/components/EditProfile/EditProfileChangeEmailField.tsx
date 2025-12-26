import { useState } from 'react'
import { useTimer } from '@/hooks/useTimer/useTimer'
import { ChangeEmailForm } from '../ChangeEmailForm'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { Input } from '../ui/input'

interface EditProfileChangeEmailFieldProps {
  currentEmail: string
}

export function EditProfileChangeEmailField({ currentEmail }: EditProfileChangeEmailFieldProps) {
  const [open, setOpen] = useState(false)
  const timer = useTimer(30, {
    immediately: false
  })

  return (
    <Dialog open={open} onOpenChange={state => setOpen(state)}>
      <div className="flex w-full items-center gap-2">
        <Input type="email" disabled value={currentEmail} />
        <DialogTrigger>
          <Button type="button">
            Change
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent className="sm:max-w-[448px]">
        <ChangeEmailForm.Root options={{
          onSuccess() {
            timer.start()
            setOpen(false)
          },
        }}
        >
          <ChangeEmailForm.NewEmailField disabled={timer.active} />
          {timer.active && <p className="text-muted-foreground text-sm">Email sent. You can retry in {String(timer.seconds).padStart(2, '0')}s</p>}
          <ChangeEmailForm.Submit disabled={timer.active}>
            Change email
          </ChangeEmailForm.Submit>
        </ChangeEmailForm.Root>
      </DialogContent>
    </Dialog>
  )
}
