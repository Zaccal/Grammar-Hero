import process from 'node:process'
import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { openAPI, username } from 'better-auth/plugins'
import prisma from '../../prisma'

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  plugins: [openAPI(), username()],
  trustedOrigins: [process.env.CORS_ORIGIN || ''],
  emailAndPassword: {
    enabled: true,
  },
  advanced: {
    defaultCookieAttributes: {
      sameSite: 'none',
      secure: true,
      httpOnly: true,
    },
  },
})

export interface BetterAuthVariables {
  Variables: {
    user: typeof auth.$Infer.Session.user | null
    session: typeof auth.$Infer.Session.session | null
  }
}
