import { DURATION_REGEX } from '../lib/constants'
import { z } from 'zod'

export const topicCreateSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(100),
  shortDescription: z.string().min(56),
  content: z.string().min(100),
  durationMin: z.string().regex(DURATION_REGEX),
  durationMax: z.string().regex(DURATION_REGEX),
  level: z.enum(['Advanced', 'Basic', 'Intermediate']),
  image: z.url(),
})

export type TopicCreateSchema = z.infer<typeof topicCreateSchema>
