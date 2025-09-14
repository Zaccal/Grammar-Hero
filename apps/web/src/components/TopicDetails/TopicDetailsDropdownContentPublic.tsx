import {
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '../ui/dropdown-menu'

interface TopicDetailsDropdownContentPublicProps {
  children?: React.ReactNode
}

export function TopicDetailsDropdownContentPublic({
  children,
}: TopicDetailsDropdownContentPublicProps) {
  return (
    <>
      <DropdownMenuSeparator />
      <DropdownMenuLabel>Options</DropdownMenuLabel>
      <DropdownMenuGroup>{children}</DropdownMenuGroup>
    </>
  )
}
