import z from 'zod'
import { protectedProcedure, router } from '@/lib/trpc'
import { filterParamsSchema } from '@/schemas/filterParams.schema'
import { topicCreateSchema } from '../../schemas/topics.schema'
import {
  createTopic,
  getAll,
  getById,
  toggleBookmark,
  toggleLike,
} from './topics.constroller'

export const topicsRouter = router({
  getAll: protectedProcedure
    .input(filterParamsSchema)
    .query(({ input, ctx }) => getAll(input, ctx.session.user.id)),
  getById: protectedProcedure
    .input(z.string())
    .query(({ input, ctx }) => getById(input, ctx.session.user.id)),
  create: protectedProcedure
    .input(topicCreateSchema)
    .mutation(({ input, ctx }) => createTopic(input, ctx.session.user.id)),
  like: protectedProcedure
    .input(z.object({ topicId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id
      const topicId = input.topicId

      return toggleLike(topicId, userId)
    }),
  bookmark: protectedProcedure
    .input(z.object({ topicId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id
      const topicId = input.topicId

      return toggleBookmark(topicId, userId)
    }),
})
