import { AtSign } from 'lucide-react'
import { useState } from 'react'
import { useSession } from '@/hooks'
import { ChangeEmailForm } from '../ChangeEmailForm/index'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { Input, InputWrapper } from '../ui/input'

function EditProfileFormChangeEmail() {
  const { data } = useSession()
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={state => setOpen(state)}>
      <div className="flex items-center gap-3">
        <InputWrapper>
          <Input value={data?.user.email} disabled />
          <AtSign />
        </InputWrapper>
        <DialogTrigger asChild>
          <Button type="button">
            Change
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent className="sm:max-w-[440px]">
        <ChangeEmailForm.Root options={{
          onSuccess: () => setOpen(false)
        }}
        >
          <ChangeEmailForm.NewEmailField />
        </ChangeEmailForm.Root>
      </DialogContent>
    </Dialog>
  )
}

export default EditProfileFormChangeEmail
