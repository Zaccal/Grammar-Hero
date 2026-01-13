import z from 'zod'

export const setPasswordSchema = z.object({
  newPassword: z.string().min(8),
})

export type SetPasswordSchema = z.infer<typeof setPasswordSchema>
