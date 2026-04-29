import { z } from 'zod'
import { DURATION_REGEX } from '../lib/constants'

export const answerSchema = z.object({
  text: z.string(),
  isCorrect: z.boolean().optional().default(false),
})

export type AnswerSchema = z.infer<typeof answerSchema>

export const exerciseSchema = z.object({
  question: z.string(),
  answers: z.array(answerSchema),
  explanation: z.string().optional(),
  hint: z.string().optional(),
  isMultipleChoice: z.boolean().optional().default(false),
})

export type ExerciseSchema = z.infer<typeof exerciseSchema>

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
  exercises: z.array(exerciseSchema),
})

export type TopicCreateSchema = z.infer<typeof topicCreateSchema>
