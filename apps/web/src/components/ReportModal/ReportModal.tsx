import type { DialogProps } from '@radix-ui/react-dialog'
import { Dialog } from '../ui/dialog'
import { reportModalContext } from './ReportModalContext'

interface ReportModalProps extends DialogProps {
  onSuccess?: () => void
  userId: string
}

export function ReportModal({
  children,
  onSuccess,
  userId,
  ...props
}: ReportModalProps) {
  return (
    <reportModalContext.Provider
      initialValue={{
        onSuccess,
        userId,
      }}
    >
      <Dialog {...props}>{children}</Dialog>
    </reportModalContext.Provider>
  )
}
