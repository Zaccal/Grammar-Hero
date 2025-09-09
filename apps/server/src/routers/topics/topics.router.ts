import { protectedProcedure, router } from '@/lib/trpc'
import { getAll, getById, createTopic } from './topics.constroller'
import z from 'zod'
import { topicCreateSchema } from './topics.schema'
import { searchSchema } from '@/schemas/search.schema'

export const topicsRouter = router({
  getAll: protectedProcedure
    .input(searchSchema)
    .query(({ input }) => getAll(input)),
  getById: protectedProcedure
    .input(z.string())
    .query(({ input }) => getById(input)),
  create: protectedProcedure
    .input(topicCreateSchema)
    .mutation(({ input, ctx }) => createTopic(input, ctx.session.user.id)),
})
