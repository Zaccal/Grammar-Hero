import { Ellipsis } from 'lucide-react'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

interface TopicDetailsDropdownProps {
  children?: React.ReactNode
}

export function TopicDetailsDropdown({ children }: TopicDetailsDropdownProps) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost">
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>{children}</DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
