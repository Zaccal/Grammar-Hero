import type { DialogProps } from '@radix-ui/react-dialog'
import { Dialog } from '../ui/dialog'
import { ReportModalContext } from './ReportModalContext'

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
    <ReportModalContext.Provider
      initialValue={{
        onSuccess,
        userId,
      }}
    >
      <Dialog {...props}>{children}</Dialog>
    </ReportModalContext.Provider>
  )
}
