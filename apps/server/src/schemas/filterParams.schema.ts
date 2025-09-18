import { DURATION_REGEX } from '../lib/constants'
import { z } from 'zod'

export const filterParamsSchema = z.object({
  query: z.string().optional().catch(''),
  limit: z.number().default(20).catch(20).optional(),
  offset: z.number().default(0).catch(0).optional(),
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
