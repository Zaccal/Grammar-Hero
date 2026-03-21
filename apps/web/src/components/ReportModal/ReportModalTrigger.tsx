import type { DialogTriggerProps } from '@radix-ui/react-dialog'
import { DialogTrigger } from '../ui/dialog'

export function ReportModalTrigger({ children, ...props }: DialogTriggerProps) {
  return <DialogTrigger {...props}>{children}</DialogTrigger>
}
