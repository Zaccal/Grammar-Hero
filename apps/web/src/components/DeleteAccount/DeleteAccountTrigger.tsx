import { DialogTrigger } from '../ui/dialog'

interface DeleteAccountTriggerProps {
  children?: React.ReactNode | React.ReactNode[]
}

export function DeleteAccountTrigger({ children }: DeleteAccountTriggerProps) {
  return (
    <DialogTrigger asChild>
      {children}
    </DialogTrigger>
  )
}
