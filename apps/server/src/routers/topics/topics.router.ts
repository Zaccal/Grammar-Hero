import z from 'zod'
import { protectedProcedure, router } from '@/lib/trpc'
import { filterParamsSchema } from '@/schemas/filterParams.schema'
import {
  topicCreateSchema,
  topicUpdateSchema,
} from '../../schemas/topics.schema'
import {
  createTopic,
  deleteTopic,
  getAll,
  getById,
  toggleBookmark,
  toggleLike,
  updateTopic,
} from './topics.constroller'

// TODO: Write tests
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
  delete: protectedProcedure
    .input(z.string())
    .mutation(({ input, ctx }) => deleteTopic(input, ctx.session.user.id)),
  update: protectedProcedure
    .input(z.object({ topicId: z.string(), data: topicUpdateSchema }))
    .mutation(({ input, ctx }) =>
      updateTopic(input.topicId, ctx.session.user.id, input.data)
    ),
})
