import type { DialogTriggerProps } from '@radix-ui/react-dialog'
import { DialogTrigger } from '../ui/dialog'

export function DeleteTopicModalTrigger({
  children,
  ...props
}: DialogTriggerProps) {
  return <DialogTrigger {...props}>{children}</DialogTrigger>
}
