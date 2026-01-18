import { TRPCError } from '@trpc/server'
import prisma from 'prisma'

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
