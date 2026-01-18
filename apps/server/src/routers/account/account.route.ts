import z from 'zod'
import { protectedProcedure, router } from '@/lib/trpc'
import { getProvider } from './account.controller'

export const accountRouter = router({
  getProvider: protectedProcedure
    .input(z.string().nullish())
    .query(({ ctx }) => getProvider(ctx.session.user.id)),
})
