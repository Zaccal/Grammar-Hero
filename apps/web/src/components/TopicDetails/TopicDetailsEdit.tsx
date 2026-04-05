import { Link } from '@tanstack/react-router'
import { DropdownMenuItem } from '../ui/dropdown-menu'
import { TopicDetailsContext } from './TopicDetailsContext'

export function TopicDetailsEdit() {
  const topicId = TopicDetailsContext.useSelect(state => state.id)

  return (
    <Link
      to="/topic/edit/$id"
      params={{
        id: topicId,
      }}
    >
      <DropdownMenuItem>Edit</DropdownMenuItem>
    </Link>
  )
}
