import * as z from 'zod/mini'

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().check(z.minLength(1)),
    newPassword: z.string().check(z.minLength(2)),
    comfirmPassword: z.string().check(z.minLength(1)),
  })
  .check(
    z.refine(data => data.newPassword === data.comfirmPassword, {
      path: ['comfirmPassword'],
      message: 'Passwords do not match',
    })
  )

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>
