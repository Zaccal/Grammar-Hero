import z from 'zod'

export const OTPSchema = z.object({
  otp: z
    .string()
    .min(6, { message: 'OTP must be at least 6 characters' })
    .max(6, { message: 'OTP must be at most 6 characters' }),
})

export type OTPSchemaType = z.infer<typeof OTPSchema>
