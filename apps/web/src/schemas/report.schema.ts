import z from 'zod'

export const reportSchema = z.object({
  reason: z.string().min(3).max(30),
  message: z.string().min(3).max(100),
})

export type ReportSchema = z.infer<typeof reportSchema>
