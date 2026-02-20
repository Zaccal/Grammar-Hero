import type { InfinityPaginationTopics } from '@server/routers/profile/profile.types'
import type { SuccessSchemaType } from '@/schemas/success.schema'

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
