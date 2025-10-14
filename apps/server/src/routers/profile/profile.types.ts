import type { inferRouterOutputs } from '@trpc/server'
import type { AppRouter } from '..'

export type InfinityPaginationTopics =
  inferRouterOutputs<AppRouter>['profile']['getAllMyTopics']
