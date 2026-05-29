import * as z from 'zod/mini'

export const reportSchema = z.object({
  reason: z
    .string()
    .check(
      z.minLength(3, { error: 'Reason must be at least 3 characters' }),
      z.maxLength(30, { error: 'Reason must be at most 30 characters' })
    ),
  message: z
    .string()
    .check(
      z.minLength(3, { error: 'Message must be at least 3 characters' }),
      z.maxLength(100, { error: 'Message must be at most 100 characters' })
    ),
})

export type ReportSchema = z.infer<typeof reportSchema>
