import type { MouseEvent } from 'react'
import { useLocation } from '@tanstack/react-router'
import { useCopy } from '@/hooks'
import { DropdownMenuItem } from '../ui/dropdown-menu'

export function TopicDetailsCopyLink() {
  const { url } = useLocation()
  const { copy, copied } = useCopy()

  function handlerCopyLink(event: MouseEvent<HTMLDivElement>) {
    event.preventDefault()
    copy(url)
  }

  return (
    <DropdownMenuItem onClick={handlerCopyLink}>
      {copied ? 'Copied!' : 'Copy link'}
    </DropdownMenuItem>
  )
}
