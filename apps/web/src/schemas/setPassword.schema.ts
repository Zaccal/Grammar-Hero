import * as z from 'zod/mini'

export const setPasswordSchema = z
  .object({
    password: z.string().check(
      z.minLength(8, {
        error: 'Password must be at least 8 characters long',
      }),
      z.maxLength(100, {
        error: 'Password must be at most 100 characters long',
      })
    ),
    confirmPassword: z.string().check(
      z.minLength(8, {
        error: 'Password must be at least 8 characters long',
      }),
      z.maxLength(100, {
        error: 'Password must be at most 100 characters long',
      })
    ),
  })
  .check(
    z.refine(data => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    })
  )

export type SetPasswordSchema = z.infer<typeof setPasswordSchema>
