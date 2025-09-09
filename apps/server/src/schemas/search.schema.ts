import { z } from 'zod'

export const searchSchema = z.object({
  query: z.string().optional(),
  limit: z.number().default(20).optional(),
  offset: z.number().default(0).optional(),
  sort: z.enum(['asc', 'desc']).default('asc').optional(),
  sortField: z
    .enum(['createdAt', 'updatedAt', 'title', 'likes', 'duration'])
    .default('createdAt')
    .optional(),
  level: z
    .enum(['Advanced', 'Basic', 'Intermediate'])
    .default('Basic')
    .optional(),
  duration: z.date().optional(),
})

export type SearchSchema = z.infer<typeof searchSchema>
