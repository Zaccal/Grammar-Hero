import { protectedProcedure, router } from '@/lib/trpc'
import { paginationShema } from '@/schemas/pagination.schema'
import { getAllMyTopics } from './profile.controller'

export const profileRouter = router({
  getAllMyTopics: protectedProcedure
    .input(paginationShema)
    .query(({ ctx, input }) => getAllMyTopics(ctx.session.user.id, input)),
})
