import z from 'zod'

export const SuccessSchema = z.object({
  title: z.string().min(2).max(100).catch('Success'),
  description: z.string().min(2).max(1000).catch('The course has been successfully completed.'),
  message: z.string().min(2).max(1000).catch('The course has been successfully completed.'),
})

export type SuccessSchemaType = z.infer<typeof SuccessSchema>
