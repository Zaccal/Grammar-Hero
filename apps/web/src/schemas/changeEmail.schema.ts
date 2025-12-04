import z from 'zod'

export const changeEmailSchema = z.object({
  newEmail: z.string().email('Invalid email address'),
})

export type ChangeEmailSchema = z.infer<typeof changeEmailSchema>
