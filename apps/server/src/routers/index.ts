import { protectedProcedure, publicProcedure, router } from '@/lib/trpc'

export const appRouter = router({
  healthCheck: publicProcedure.query(() => 'ok'),
  protectedHealthCheck: protectedProcedure.query(() => 'ok'),
})
export type AppRouter = typeof appRouter
