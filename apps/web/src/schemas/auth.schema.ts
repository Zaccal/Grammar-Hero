import z, { email } from 'zod'

export const signInSchema = z.object({
  email: email({ error: 'Invalid email address' }),
  password: z.string().min(1, 'Password is required'),
})

export type SignInSchema = z.infer<typeof signInSchema>
