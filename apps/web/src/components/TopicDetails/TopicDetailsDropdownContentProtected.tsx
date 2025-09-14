import {
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '../ui/dropdown-menu'

interface TopicDetailsDropdownContentProtectedProps {
  children?: React.ReactNode
}

export function TopicDetailsDropdownContentProtected({
  children,
}: TopicDetailsDropdownContentProtectedProps) {
  return (
    <>
      <DropdownMenuLabel>Special options</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>{children}</DropdownMenuGroup>
    </>
  )
}
