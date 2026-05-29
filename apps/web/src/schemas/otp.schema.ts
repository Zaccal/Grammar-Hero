import * as z from 'zod/mini'

export const OTPSchema = z.object({
  otp: z
    .string()
    .check(
      z.minLength(6, { message: 'OTP must be at least 6 characters' }),
      z.maxLength(6, { message: 'OTP must be at most 6 characters' })
    ),
})

export type OTPSchemaType = z.infer<typeof OTPSchema>
