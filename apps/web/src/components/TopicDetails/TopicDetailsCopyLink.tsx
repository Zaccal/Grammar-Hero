import type { MouseEvent } from 'react'
import { useLocation } from '@tanstack/react-router'
import { useCopy } from '@/hooks'
import { DropdownMenuItem } from '../ui/dropdown-menu'

export function TopicDetailsCopyLink() {
  const { copy, copied } = useCopy()
  const { pathname, hash } = useLocation()
  const url = `${window.location.origin}${pathname}${hash}`

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
