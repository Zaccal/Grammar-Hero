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

export const CREATE_FORM_ID = 'CREATE_FORM_TRIGGER'
export const EDIT_FORM_ID = 'EDIT_FORM_TRIGGER'

export const SUCCESS_DELETING_ACCOUNT: SuccessSchemaType = {
  title: 'Account Deleted',
  message: 'Your account has been successfully deleted.',
  description: 'We hope to see you again soon!',
}

export const MEDIA_ICONS: Record<Media, string> = {
  whatsapp: '/whatsapp.png',
  linkedin: '/linkedin.png',
  facebook: '/facebook.png',
  messenger: '/messenger.png',
  reddit: '/reddit.png',
  telegram: '/telegram.png',
  twitter: '/twitter.png',
  line: '/line.png',
}

export const MEDIA_COLORS: Record<Media, string> = {
  whatsapp: '#ebfdf0',
  linkedin: '#eef3ff',
  facebook: '#e8f1fe',
  messenger: '#e6f4ff',
  reddit: '#ffece7',
  telegram: '#e6f3f8',
  twitter: '#eaf5ff',
  line: '#f3f7ea',
}

export const MEDIA_TITLES: Record<Media, string> = {
  whatsapp: 'WhatsApp',
  linkedin: 'LinkedIn',
  facebook: 'Facebook',
  messenger: 'Messenger',
  reddit: 'Reddit',
  telegram: 'Telegram',
  twitter: 'Twitter',
  line: 'Line',
}
