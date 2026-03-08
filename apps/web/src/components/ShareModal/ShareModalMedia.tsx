import type { Media } from '@/types/shareModal.type'
import {
  FacebookMessengerShareButton,
  FacebookShareButton,
  LineShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share'
import { MEDIA_COLORS, MEDIA_ICONS, MEDIA_TITLES } from '@/lib/constants'
import RedditShareButtonCustom from '../ui/RedditShareButtonCustom'

interface ShareModalMediaProps {
  media: Media
}

interface ShareModalMediaProps {
  media: Media
  url: string
  title: string
}

const SHARE_BUTTONS = {
  facebook: FacebookShareButton,
  messenger: FacebookMessengerShareButton,
  reddit: RedditShareButtonCustom,
  telegram: TelegramShareButton,
  twitter: TwitterShareButton,
  whatsapp: WhatsappShareButton,
  linkedin: LinkedinShareButton,
  line: LineShareButton,
}

export function ShareModalMedia({ media, title, url }: ShareModalMediaProps) {
  const ShareButton = SHARE_BUTTONS[media]

  if (!ShareButton) {
    return null
  }

  if (media === 'messenger') {
    return (
      <ShareButton
        title={title}
        url={url}
        appId={import.meta.env.VITE_FACEBOOK_APP_ID}
      >
        <ShareModalMediaContent media={media} />
      </ShareButton>
    )
  }

  return (
    <ShareButton appId="" title={title} url={url}>
      <ShareModalMediaContent media={media} />
    </ShareButton>
  )
}

function ShareModalMediaContent({ media }: { media: Media }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div
        style={{ backgroundColor: MEDIA_COLORS[media] }}
        className="w-14 h-14 md:w-18 md:h-18 rounded-full flex items-center justify-center"
      >
        <img
          src={MEDIA_ICONS[media]}
          alt={`${media}_icon`}
          className="w-6 h-6 object-contain"
        />
      </div>
      <p className="text-sm">{MEDIA_TITLES[media]}</p>
    </div>
  )
}
