import { z } from 'zod'
import { DURATION_REGEX } from '../lib/constants'

export const filterParamsSchema = z.object({
  query: z.string().optional().catch(''),
  limit: z.number().min(1).max(50).default(12),
  cursor: z.string().optional().catch(undefined),
  sort: z.enum(['asc', 'desc']).default('desc').catch('desc').optional(),
  sortField: z
    .enum(['createdAt', 'updatedAt', 'title', 'likes', 'duration'])
    .default('likes')
    .catch('likes')
    .optional(),
  level: z
    .enum(['Advanced', 'Basic', 'Intermediate'])
    .optional()
    .catch(undefined),
  durationMin: z
    .string()
    .regex(DURATION_REGEX, {
      message: 'Duration must be in 00:00:00 format',
    })
    .optional()
    .catch(undefined),
  durationMax: z
    .string()
    .regex(DURATION_REGEX, {
      message: 'Duration must be in 00:00:00 format',
    })
    .optional()
    .catch(undefined),
})

export type FilterParamsSchema = z.infer<typeof filterParamsSchema>
