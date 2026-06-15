import { protectedProcedure, publicProcedure, router } from '../lib/trpc'
import { profileRouter } from './profile/profile.route'
import { reportRouter } from './report/report.router'
import { topicsRouter } from './topics/topics.router'

export const appRouter = router({
  healthCheck: publicProcedure.query(() => 'ok'),
  protectedHealthCheck: protectedProcedure.query(() => 'ok'),
  profile: profileRouter,
  topics: topicsRouter,
  report: reportRouter,
})
export type AppRouter = typeof appRouter
