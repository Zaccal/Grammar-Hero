import { CircleAlert, Trash } from 'lucide-react'
import { useState } from 'react'
import { useSession } from '@/hooks'
import { useDeleteAccount } from '@/hooks/useDeleteAccount'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { Separator } from '../ui/separator'

interface DeleteAccountProps {
  children?: React.ReactElement | React.ReactElement[]
}

export function DeleteAccount({ children }: DeleteAccountProps) {
  const [open, setOpen] = useState(false)
  const { data } = useSession()
  const { mutateAsync: deleteAccount } = useDeleteAccount({
    onSuccess: () => {
      setOpen(false)
    },
  })

  if (!data) {
    return null
  }

  function handleDeleteAccount() {
    deleteAccount()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto w-fit p-6 bg-transparent border-destructive/15 border-6 rounded-full mb-4">
            <div className="bg-destructive w-fit text-destructive-foreground rounded-full p-6">
              <Trash size={18} />
            </div>
          </div>
          <DialogTitle className="text-center max-w-xs mx-auto leading-6">
            Are you sure you want to delete your account?
          </DialogTitle>
          <DialogDescription className="text-center mt-2">
            {data.user.email}
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <div>
          <p className="mt-2 flex items-start gap-2 p-4 bg-destructive/10 rounded-md text-destructive">
            <CircleAlert size={32} />
            This action is irreversible and will permanently delete your
            account.
          </p>
        </div>
        <Separator />
        <DialogFooter className="grid grid-cols-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleDeleteAccount} variant="destructive">
            Send Confirmation Email
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
