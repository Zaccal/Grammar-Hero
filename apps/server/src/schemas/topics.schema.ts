import { z } from 'zod'
import { DURATION_REGEX } from '../lib/constants'

export const topicCreateSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(100),
  shortDescription: z.string().min(56),
  content: z.string().min(100),
  durationMin: z
    .string()
    .regex(DURATION_REGEX, { message: 'Invalid duration format' })
    .optional(),
  durationMax: z
    .string()
    .regex(DURATION_REGEX, { message: 'Invalid duration format' })
    .optional(),
  level: z.enum(['Advanced', 'Basic', 'Intermediate'], {
    message: 'Required level',
  }),
  image: z.string(),
})

export type TopicCreateSchema = z.infer<typeof topicCreateSchema>
