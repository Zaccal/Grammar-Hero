import { protectedProcedure, publicProcedure, router } from '@/lib/trpc'
import { topicsRouter } from './topics/topics.router'

export const appRouter = router({
  healthCheck: publicProcedure.query(() => 'ok'),
  protectedHealthCheck: protectedProcedure.query(() => 'ok'),

  topics: topicsRouter,
})
export type AppRouter = typeof appRouter
