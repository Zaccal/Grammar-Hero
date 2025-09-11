import { z } from 'zod'

export const filterParamsSchema = z.object({
  query: z.string().optional().catch(''),
  limit: z.number().default(20).catch(20).optional(),
  offset: z.number().default(0).catch(0).optional(),
  sort: z.enum(['asc', 'desc']).default('asc').catch('asc').optional(),
  sortField: z
    .enum(['createdAt', 'updatedAt', 'title', 'likes', 'duration'])
    .default('createdAt')
    .catch('createdAt')
    .optional(),
  level: z
    .enum(['Advanced', 'Basic', 'Intermediate'])
    .optional()
    .catch(undefined),
  duration: z.string().optional().catch(undefined),
})

export type FilterParamsSchema = z.infer<typeof filterParamsSchema>
