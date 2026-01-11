import type { Context } from '@/lib/context'
import type { SetPasswordSchema } from '@/schemas/setPassword.schema'
import { TRPCError } from '@trpc/server'
import prisma from 'prisma'
import { auth } from '@/lib/auth'

export async function setPassword(ctx: Context, data: SetPasswordSchema) {
  await auth.api.setPassword({
    body: data,
    headers: ctx.headers,
  })
}

export async function getProvider(userId: string) {
  // prettier-ignore
  try {
    const account = await prisma.account.findFirst({
      where: {
        userId,
      },
    })

    return account?.providerId || null
  }
  catch (error) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to get provider',
      cause: error
    })
  }
}
