import { z } from 'zod'

export const reportSchema = z.object({
  reason: z.string().min(3, 'Reason is required'),
  message: z.string().min(3, 'Messsage is required'),
  userId: z.string(),
})

export type ReportSchema = z.infer<typeof reportSchema>
