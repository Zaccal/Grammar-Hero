import { protectedProcedure, router } from '@/lib/trpc'
import { getAll } from './topics.constroller'

export const topicsRouter = router({
  getAll: protectedProcedure.query(() => getAll()),
})
