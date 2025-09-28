import type { Context } from './context'
import { initTRPC, TRPCError } from '@trpc/server'
import superjson from 'superjson'

export const t = initTRPC.context<Context>().create({
  transformer: superjson,
})

export const router = t.router
export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be logged in to access this resource',
      cause: 'No session',
    })
  }
  return next({
    ctx: {
      ...ctx,
      session: ctx.session,
    },
  })
})
