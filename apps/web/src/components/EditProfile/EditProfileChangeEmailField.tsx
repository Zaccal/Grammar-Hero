import { ChangeEmailForm } from '../ChangeEmailForm'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { Input } from '../ui/input'

interface EditProfileChangeEmailFieldProps {
  currentEmail: string
}

export function EditProfileChangeEmailField({ currentEmail }: EditProfileChangeEmailFieldProps) {
  return (
    <Dialog>
      <div className="flex w-full items-center gap-2">
        <Input type="email" disabled value={currentEmail} />
        <DialogTrigger>
          <Button type="button">
            Change
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent className="sm:max-w-[448px]">
        <ChangeEmailForm.Root>
          <ChangeEmailForm.NewEmailField />
        </ChangeEmailForm.Root>
      </DialogContent>
    </Dialog>
  )
}
