import { protectedProcedure, router } from '@/lib/trpc'
import { setPasswordSchema } from '@/schemas/setPassword.schema'
import { setPassword } from './account.controller'

export const accountRouter = router({
  changePassword: protectedProcedure
    .input(setPasswordSchema)
    .query(({ ctx, input }) => setPassword(ctx, input)),
})
