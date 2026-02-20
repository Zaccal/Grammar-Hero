import process from 'node:process'
import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_KEY ?? '')

export enum EmailTemplate {
  EMAIL_VERIFICATION_OTP = 'da204527-a3cb-41d5-89a9-bcafa360e11a',
  EMAIL_VERIFICATION_LINK = '3fbf86e2-f0fd-425b-9b45-4f317605d964',
  EMAIL_DELETING_ACCOUNT = 'fa192c37-bb8c-4dcf-bf32-31e8e945b176',
}
