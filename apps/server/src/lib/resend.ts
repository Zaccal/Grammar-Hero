import process from 'node:process'
import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_KEY ?? '')
