import type { MouseEvent } from 'react'
import { useState } from 'react'
import { DeleteTopicModal } from '../DeleteTopicModal'
import { DropdownMenuItem } from '../ui/dropdown-menu'
import { TopicDetailsContext } from './TopicDetailsContext'

export function TopicDetailsDelete() {
  const topicId = TopicDetailsContext.useSelect(state => state.id)
  const [open, setOpen] = useState(false)

  function handleClick(event: MouseEvent<HTMLDivElement>) {
    event.preventDefault()
    setOpen(prev => !prev)
  }

  return (
    <DeleteTopicModal.Root topicId={topicId} open={open} onOpenChange={setOpen}>
      <DeleteTopicModal.Trigger asChild>
        <DropdownMenuItem onClick={handleClick} variant="destructive">
          Delete
        </DropdownMenuItem>
      </DeleteTopicModal.Trigger>
    </DeleteTopicModal.Root>
  )
}
