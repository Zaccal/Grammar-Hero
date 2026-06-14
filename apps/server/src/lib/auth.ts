import type { BetterAuthOptions } from 'better-auth'
import process from 'node:process'
import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { emailOTP, openAPI, username } from 'better-auth/plugins'
import prisma from '../../prisma'
import { EmailTemplate, sendEmail } from './resend'

const authOptions = {
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [
    openAPI(),
    username(),
    emailOTP({
      sendVerificationOTP: async ({ email, otp }) => {
        await sendEmail(EmailTemplate.EMAIL_VERIFICATION_OTP, [email], {
          OTP: otp,
        })
      },
    }),
  ],
  trustedOrigins: [process.env.CORS_ORIGIN || ''],
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  socialProviders: {
    google: {
      prompt: 'select_account',
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    },
  },
  user: {
    changeEmail: {
      enabled: true,
    },
    deleteUser: {
      enabled: true,
      sendDeleteAccountVerification: async ({ url, user }) => {
        await sendEmail(EmailTemplate.EMAIL_DELETING_ACCOUNT, [user.email], {
          username: user.name,
          confirmationLink: url,
        })
      },
    },
  },
  account: {
    accountLinking: {
      enabled: true,
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail(EmailTemplate.EMAIL_VERIFICATION_LINK, [user.email], {
        username: user.name,
        changeEmailLink: url,
      })
    },
  },
  advanced: {
    defaultCookieAttributes: {
      sameSite: 'none',
      secure: true,
      httpOnly: true,
    },
  },
} as BetterAuthOptions

export const auth = betterAuth(authOptions) as ReturnType<
  typeof betterAuth<typeof authOptions>
>

export interface BetterAuthVariables {
  Variables: {
    user: typeof auth.$Infer.Session.user | null
    session: typeof auth.$Infer.Session.session | null
  }
}
