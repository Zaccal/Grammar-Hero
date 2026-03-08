import type { DialogContentProps } from '@radix-ui/react-dialog'
import { cn } from '@/lib/utils'
import { DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'

export function ShareModalContent({ children, ...props }: DialogContentProps) {
  return (
    <DialogContent className={cn('sm:max-w-md', props.className)} {...props}>
      <DialogHeader>
        <DialogTitle>Share</DialogTitle>
      </DialogHeader>
      {children}
    </DialogContent>
  )
}
