import type { MouseEvent } from 'react'
import { useLocation } from '@tanstack/react-router'
import { useState } from 'react'
import { useShare } from '@/hooks'
import { ShareModal } from '../ShareModal'
import { DropdownMenuItem } from '../ui/dropdown-menu'

const SHARE_TITLE = '@GrammarHero — Improve Your English 🚀'

export function TopicDetailsShare() {
  const [open, setOpen] = useState(false)
  const { pathname, hash } = useLocation()
  const url = `${window.location.origin}${pathname}${hash}`
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
          <ShareModal.Media url={url} media="twitter" title={SHARE_TITLE} />
          <ShareModal.Media url={url} media="facebook" title={SHARE_TITLE} />
          <ShareModal.Media url={url} media="reddit" title={SHARE_TITLE} />
          <ShareModal.Media url={url} media="linkedin" title={SHARE_TITLE} />
          <ShareModal.Media url={url} media="whatsapp" title={SHARE_TITLE} />
          <ShareModal.Media url={url} media="messenger" title={SHARE_TITLE} />
          <ShareModal.Media url={url} media="telegram" title={SHARE_TITLE} />
          <ShareModal.Media url={url} media="line" title={SHARE_TITLE} />
        </ShareModal.Grid>
        <ShareModal.Link link={url} />
      </ShareModal.Content>
    </ShareModal.Root>
  )
}
