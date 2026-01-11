import { protectedProcedure, publicProcedure, router } from '@/lib/trpc'
import { accountRouter } from './account/account.route'
import { profileRouter } from './profile/profile.route'
import { topicsRouter } from './topics/topics.router'

export const appRouter = router({
  healthCheck: publicProcedure.query(() => 'ok'),
  protectedHealthCheck: protectedProcedure.query(() => 'ok'),
  profile: profileRouter,
  topics: topicsRouter,
  account: accountRouter,
})
export type AppRouter = typeof appRouter
