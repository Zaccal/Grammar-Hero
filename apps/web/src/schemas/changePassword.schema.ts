import z from 'zod'

export const changePasswordSchema = z.object({
  currentPassword: z.string().nonempty(),
  newPassword: z.string().min(2),
  comfirmPassword: z.string().nonempty()
}).refine(data => data.newPassword === data.comfirmPassword, {
  path: ['comfirmPassword'],
  message: 'Passwords do not match'
})

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>
