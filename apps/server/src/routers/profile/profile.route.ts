import { protectedProcedure, router } from '@/lib/trpc'
import { paginationShema } from '@/schemas/pagination.schema'
import {
  getAllMyTopics,
  getBookmarkedTopics,
  getLikedTopics,
} from './profile.controller'

export const profileRouter = router({
  getAllMyTopics: protectedProcedure
    .input(paginationShema)
    .query(({ ctx, input }) => getAllMyTopics(ctx.session.user.id, input)),
  getLikedTopics: protectedProcedure
    .input(paginationShema)
    .query(({ ctx, input }) => getLikedTopics(ctx.session.user.id, input)),
  getBookmarkedTopics: protectedProcedure
    .input(paginationShema)
    .query(({ ctx, input }) => getBookmarkedTopics(ctx.session.user.id, input)),
})
