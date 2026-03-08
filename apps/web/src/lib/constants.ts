import type { InfinityPaginationTopics } from '@server/routers/profile/profile.types'
import type { SuccessSchemaType } from '@/schemas/success.schema'
import type { Media } from '@/types/shareModal.type'

export const LIMIT_OF_TOPICS = 10
export const QUERY_INPUT = {
  limit: LIMIT_OF_TOPICS,
}
export const QUERY_OPTION = {
  getNextPageParam: (last: InfinityPaginationTopics) =>
    last.nextCursor ?? undefined,
  initialCursor: undefined,
}

export const SCROLL_VISIBLE = 600

export const FORM_ID = 'CREATE_FORM_TRIGGER'

export const SUCCESS_DELETING_ACCOUNT: SuccessSchemaType = {
  title: 'Account Deleted',
  message: 'Your account has been successfully deleted.',
  description: 'We hope to see you again soon!',
}

export const MEDIA_ICONS: Record<Media, string> = {
  whatsapp: '/whatsapp.png',
  discord: '/discord.png',
  facebook: '/facebook.png',
  messenger: '/messenger.png',
  reddit: '/reddit.png',
  telegram: '/telegram.png',
  twitter: '/twitter.png',
  wechat: '/wechat.png',
}

export const MEDIA_COLORS: Record<Media, string> = {
  whatsapp: '#ebfdf0',
  discord: '#f2f3fb',
  facebook: '#e8f1fe',
  messenger: '#e6f4ff',
  reddit: '#ffece7',
  telegram: '#e6f3f8',
  twitter: '#eaf5ff',
  wechat: '#f3f7ea',
}

export const MEDIA_TITLES: Record<Media, string> = {
  whatsapp: 'WhatsApp',
  discord: 'Discord',
  facebook: 'Facebook',
  messenger: 'Messenger',
  reddit: 'Reddit',
  telegram: 'Telegram',
  twitter: 'Twitter',
  wechat: 'WeChat',
}
