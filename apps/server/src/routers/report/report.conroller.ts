import type { User } from 'node_modules/better-auth/dist/index.mjs'
import type { ReportSchema } from '@/schemas/report.schema'
import { TRPCError } from '@trpc/server'
import prisma from 'prisma'
import { EmailTemplate, resend } from '@/lib/resend'

export async function createReport(user: User, input: ReportSchema) {
  const localUser = await prisma.user.findFirst({
    where: {
      id: input.userId
    }
  })

  if (!localUser) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'User not found'
    })
  }

  void resend.emails.send({
   to: [localUser.email],
   template: {
     id: EmailTemplate.EMAIL_REPORT,
     variables: {
       username: localUser.name,
       reason: input.reason,
       message: input.message
     }
   }
  })
}
