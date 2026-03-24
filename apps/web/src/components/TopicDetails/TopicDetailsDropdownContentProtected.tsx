import { useSession } from '@/hooks'
import {
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '../ui/dropdown-menu'
import { TopicDetailsContext } from './TopicDetailsContext'

interface TopicDetailsDropdownContentProtectedProps {
  children?: React.ReactNode
}

export function TopicDetailsDropdownContentProtected({
  children,
}: TopicDetailsDropdownContentProtectedProps) {
  const topicUserId = TopicDetailsContext.useSelect(state => state.user.id)
  const { data: session } = useSession()
  const currentUserId = session?.user.id

  if (!currentUserId || topicUserId !== currentUserId) {
    return null
  }

  return (
    <>
      <DropdownMenuLabel>Special options</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>{children}</DropdownMenuGroup>
      <DropdownMenuSeparator />
    </>
  )
}
