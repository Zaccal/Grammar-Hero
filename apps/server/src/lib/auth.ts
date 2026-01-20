import process from 'node:process'
import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { emailOTP, openAPI, username } from 'better-auth/plugins'
import prisma from '../../prisma'
import { EmailTemplate, resend } from './resend'

export const auth: ReturnType<typeof betterAuth> = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [
    openAPI(),
    username(),
    emailOTP({
      sendVerificationOTP: async ({ email, otp }) => {
        void resend.emails.send({
          to: [email],
          template: {
            id: EmailTemplate.EMAIL_VERIFICATION_OTP,
            variables: {
              OTP: otp,
            },
          },
        })
      },
    }),
  ],
  trustedOrigins: [process.env.CORS_ORIGIN || ''],
  emailAndPassword: {
    enabled: true,
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
  },
  account: {
    accountLinking: {
      enabled: true,
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      void resend.emails.send({
        to: [user.email],
        template: {
          id: EmailTemplate.EMAIL_VERIFICATION_LINK,
          variables: {
            username: user.name,
            changeEmailLink: url,
          },
        },
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
})

export interface BetterAuthVariables {
  Variables: {
    user: typeof auth.$Infer.Session.user | null
    session: typeof auth.$Infer.Session.session | null
  }
}
