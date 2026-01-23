import { protectedProcedure, publicProcedure, router } from '@/lib/trpc'
import { profileRouter } from './profile/profile.route'
import { topicsRouter } from './topics/topics.router'

export const appRouter = router({
  healthCheck: publicProcedure.query(() => 'ok'),
  protectedHealthCheck: protectedProcedure.query(() => 'ok'),
  profile: profileRouter,
  topics: topicsRouter,
})
export type AppRouter = typeof appRouter
