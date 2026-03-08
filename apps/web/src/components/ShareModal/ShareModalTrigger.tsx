import type { DialogTriggerProps } from '@radix-ui/react-dialog'
import { DialogTrigger } from '../ui/dialog'

export function ShareModalTrigger({ children, ...props }: DialogTriggerProps) {
  return <DialogTrigger {...props}>{children}</DialogTrigger>
}
