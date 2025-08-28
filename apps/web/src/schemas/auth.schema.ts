import z, { email } from 'zod'

export const signInSchema = z.object({
  email: email({ error: 'Invalid email address' }),
  password: z.string().min(1, 'Password is required'),
})

export const signUpSchema = z.object({
  username: z.string().min(2, 'Username must be at least 2 characters'),
  email: email({ error: 'Invalid email address' }),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export type SignInSchema = z.infer<typeof signInSchema>

export type SignUpSchema = z.infer<typeof signUpSchema>
