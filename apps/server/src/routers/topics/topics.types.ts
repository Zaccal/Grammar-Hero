import type { inferRouterOutputs } from '@trpc/server'
import type { AppRouter } from '..'

export type Topic = inferRouterOutputs<AppRouter>['topics']['getById']
export type Topics = inferRouterOutputs<AppRouter>['topics']['getAll']
