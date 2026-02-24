import { Dialog } from '../ui/dialog'

interface ShareModalProps {
  children?: React.ReactNode | React.ReactNode[]
}

export function ShareModal({ children }: ShareModalProps) {
  return (
    <Dialog>
      {children}
    </Dialog>
  )
}
