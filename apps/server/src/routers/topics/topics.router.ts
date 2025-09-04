import { protectedProcedure, router } from '@/lib/trpc'
import { getAll, getById } from './topics.constroller'
import z from 'zod'

export const topicsRouter = router({
  getAll: protectedProcedure.query(() => getAll()),
  getById: protectedProcedure
    .input(z.string())
    .query(({ input }) => getById(input)),
})
