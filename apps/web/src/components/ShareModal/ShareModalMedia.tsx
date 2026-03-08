import type { Media } from '@/types/shareModal.type'

import { MEDIA_COLORS, MEDIA_ICONS, MEDIA_TITLES } from '@/lib/constants'

interface ShareModalMediaProps {
  media: Media
}

export function ShareModalMedia({ media }: ShareModalMediaProps) {
  // const ShareModalMediaButtonMap: Record<Media, unknown> = {
  //   twitter: TwitterShareButton,
  //   facebook: FacebookShareButton,
  //   reddit: RedditShareButton,
  //   messenger: FacebookMessengerShareButton,
  //   telegram: TelegramShareButton,
  //   whatsapp: WhatsappShareButton,
  // }

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
