import type { InfinityPaginationTopics } from '@server/routers/profile/profile.types'

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

export const HIDE_HEADER_PATHS = ['/otp-email']
