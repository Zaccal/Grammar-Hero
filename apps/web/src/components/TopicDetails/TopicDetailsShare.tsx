import type { MouseEvent } from 'react'
import { useLocation } from '@tanstack/react-router'
import { useState } from 'react'
import { useShare } from '@/hooks'
import { ShareModal } from '../ShareModal'
import { DropdownMenuItem } from '../ui/dropdown-menu'

export function TopicDetailsShare() {
  const [open, setOpen] = useState(false)
  const { url } = useLocation()
  const { trigger: share, supported } = useShare()

  function handleClick(event: MouseEvent<HTMLDivElement>) {
    event.preventDefault()

    if (supported) {
      share({
        title: '@GrammarHero — Improve Your English',
        text: 'Practice grammar, fix mistakes, and boost your English skills with @GrammarHero',
        url,
      })
    }
 else {
      setOpen(prev => !prev)
    }
  }

  return (
    <ShareModal.Root open={open} onOpenChange={setOpen}>
      <ShareModal.Trigger asChild>
        <DropdownMenuItem onClick={handleClick}>Share</DropdownMenuItem>
      </ShareModal.Trigger>
      <ShareModal.Content>
        <ShareModal.Grid>
          <ShareModal.Media media="twitter" />
          <ShareModal.Media media="facebook" />
          <ShareModal.Media media="reddit" />
          <ShareModal.Media media="discord" />
          <ShareModal.Media media="whatsapp" />
          <ShareModal.Media media="messenger" />
          <ShareModal.Media media="telegram" />
          <ShareModal.Media media="wechat" />
        </ShareModal.Grid>
        <ShareModal.Link link={url} />
      </ShareModal.Content>
    </ShareModal.Root>
  )
}
