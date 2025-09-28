import z from 'zod'
import { protectedProcedure, router } from '@/lib/trpc'
import { filterParamsSchema } from '@/schemas/filterParams.schema'
import { topicCreateSchema } from '../../schemas/topics.schema'
import { createTopic, getAll, getById } from './topics.constroller'

export const topicsRouter = router({
  getAll: protectedProcedure
    .input(filterParamsSchema)
    .query(({ input }) => getAll(input)),
  getById: protectedProcedure
    .input(z.string())
    .query(({ input }) => getById(input)),
  create: protectedProcedure
    .input(topicCreateSchema)
    .mutation(({ input, ctx }) => createTopic(input, ctx.session.user.id)),
})
