import z from 'zod'
import { protectedProcedure, router } from '@/lib/trpc'
import { setPasswordSchema } from '@/schemas/setPassword.schema'
import { getProvider, setPassword } from './account.controller'

export const accountRouter = router({
  setPassword: protectedProcedure
    .input(setPasswordSchema)
    .mutation(({ ctx, input }) => setPassword(ctx, input)),
  getProvider: protectedProcedure.input(z.string().nullish()).query(({ ctx }) =>
    getProvider(ctx.session.user.id)
  ),
})
