import * as z from 'zod/mini'
import { email } from 'zod/mini'

export const signInSchema = z.object({
  email: email({ error: 'Invalid email address' }),
  password: z.string().check(z.minLength(1, 'Password is required')),
})

export const signUpSchema = z.object({
  username: z
    .string()
    .check(z.minLength(2, 'Username must be at least 2 characters')),
  email: email({ error: 'Invalid email address' }),
  password: z
    .string()
    .check(z.minLength(8, 'Password must be at least 8 characters')),
})

export type SignInSchema = z.infer<typeof signInSchema>

export type SignUpSchema = z.infer<typeof signUpSchema>
