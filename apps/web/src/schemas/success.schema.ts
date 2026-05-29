import * as z from 'zod/mini'

export const SuccessSchema = z.object({
  title: z.string().check(z.minLength(2), z.maxLength(100)),
  description: z.string().check(z.minLength(2), z.maxLength(1000)),
  message: z.string().check(z.minLength(2), z.maxLength(1000)),
})

export type SuccessSchemaType = z.infer<typeof SuccessSchema>
