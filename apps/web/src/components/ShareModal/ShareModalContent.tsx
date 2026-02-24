import type { DialogContentProps } from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { DialogClose, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'

export function ShareModalContent({ children, ...props }: DialogContentProps) {
  return (
    <DialogContent className={cn('sm:max-w-md', props.className)} {...props}>
      <DialogHeader>
        <DialogTitle>
          Share
        </DialogTitle>
        <DialogClose asChild>
         <Button size="icon" variant="secondary">
           <X />
         </Button>
        </DialogClose>
      </DialogHeader>
      {children}
    </DialogContent>
  )
}
