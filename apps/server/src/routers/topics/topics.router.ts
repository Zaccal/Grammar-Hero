import { protectedProcedure, router } from '@/lib/trpc'
import { getAll, getById, createTopic } from './topics.constroller'
import z from 'zod'
import { topicCreateSchema } from '../../schemas/topics.schema'
import { filterParamsSchema } from '@/schemas/filterParams.schema'

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
