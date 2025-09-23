import { z } from 'zod'

export const createTopicFormSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(100),
  shortDescription: z.string().min(56),
  content: z.string().min(100),
  duration: z.string(),
  level: z.enum(['Advanced', 'Basic', 'Intermediate']),
  image: z.string(),
})

export type CreateTopicFormSchema = z.infer<typeof createTopicFormSchema>
