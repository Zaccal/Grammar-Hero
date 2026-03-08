import type { DialogProps } from '@radix-ui/react-dialog'
import { Dialog } from '../ui/dialog'

export function ShareModal({ children, ...props }: DialogProps) {
  return <Dialog {...props}>{children}</Dialog>
}
