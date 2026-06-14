import process from 'node:process'
import { APIError } from 'better-auth/api'
import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_KEY ?? '')

export enum EmailTemplate {
  EMAIL_VERIFICATION_OTP = 'da204527-a3cb-41d5-89a9-bcafa360e11a',
  EMAIL_VERIFICATION_LINK = '3fbf86e2-f0fd-425b-9b45-4f317605d964',
  EMAIL_DELETING_ACCOUNT = 'fa192c37-bb8c-4dcf-bf32-31e8e945b176',
  EMAIL_REPORT = '99c34fed-487d-4cf0-9307-f50ef65d7c1f',
}

export async function sendEmail(
  template: EmailTemplate,
  to: string[],
  variables?: Record<string, string>
) {
  try {
    const response = await resend.emails.send({
      to,
      template: {
        id: template,
        variables,
      },
    })

    if (response.error) {
      console.error('Failed to send verification OTP email', {
        email: to,
        templateId: template,
        error: response.error,
      })

      throw new APIError('INTERNAL_SERVER_ERROR', {
        message: 'Failed to send verification code',
      })
    }
  }
 catch (error) {
    if (error instanceof APIError) {
      throw error
    }

    console.error('Failed to send verification OTP email', {
      email: to,
      templateId: template,
      error,
    })

    throw new APIError('INTERNAL_SERVER_ERROR', {
      message: 'Failed to send verification code',
    })
  }
}
