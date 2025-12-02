import z from 'zod'

export const otpFormSchema = z.object({
  pin: z.string().length(6, 'OTP must be 6 digits long'),
})

export type OtpFormSchema = z.infer<typeof otpFormSchema>
