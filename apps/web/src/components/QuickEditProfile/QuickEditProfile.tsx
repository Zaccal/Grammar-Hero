import { Key, Mail, Trash } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

interface QuickEditProfileProps {
  children?: React.ReactNode[] | React.ReactNode
}

export default function QuickEditProfile({ children }: QuickEditProfileProps) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent className="w-fit mt-2">
          <DropdownMenuItem>
            <Mail /> Change mail
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Key /> Change password
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">
            <Trash /> Delete account
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
