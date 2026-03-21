import type { MouseEvent } from 'react'
import { useState } from 'react'
import { ReportModal } from '../ReportModal'
import { DropdownMenuItem } from '../ui/dropdown-menu'
import { topicDetailsContext } from './TopicDetailsContext'

export function TopicDetailsReport() {
  const userId = topicDetailsContext.useSelect(state => state.user.id)
  const [open, setOpen] = useState(false)

  function handleClick(event: MouseEvent<HTMLDivElement>) {
    event.preventDefault()
    setOpen(true)
  }

  return (
    <>
      <ReportModal.Root
        onSuccess={() => setOpen(false)}
        userId={userId}
        open={open}
        onOpenChange={setOpen}
      >
        <ReportModal.Trigger asChild>
          <DropdownMenuItem onClick={handleClick}>Report</DropdownMenuItem>
        </ReportModal.Trigger>
        <ReportModal.Content>
          <ReportModal.Field
            name="reason"
            label="Reason"
            placeholder="Enter a reason"
          />
          <ReportModal.Field
            name="message"
            label="Message"
            placeholder="Enter a message"
          />
        </ReportModal.Content>
      </ReportModal.Root>
    </>
  )
}
