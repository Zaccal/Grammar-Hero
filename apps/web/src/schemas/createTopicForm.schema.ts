import { z } from 'zod/mini'

export const answerSchema = z.object({
  id: z.string(),
  text: z.string(),
  isCorrect: z.boolean(),
})

export type AnswerSchema = z.infer<typeof answerSchema>

export const exerciseSchema = z.object({
  id: z.string(),
  question: z.string().check(z.minLength(1, 'Please enter a question')),
  answers: z
    .array(answerSchema)
    .check(z.minLength(2, 'Please provide at least 2 answers'))
    .check(
      z.refine(answers => answers.some(answer => answer.isCorrect), {
        message: 'Please provide at least one correct answer',
      })
    ),
  explanation: z.optional(z.string()),
  hint: z.optional(z.string()),
  isMultipleChoice: z.optional(z.boolean()),
})

export type ExerciseSchema = z.infer<typeof exerciseSchema>

export const createTopicFormSchema = z.object({
  title: z.string().check(z.minLength(3)),
  description: z.string().check(z.minLength(100)),
  shortDescription: z.string().check(z.minLength(56)),
  content: z.string().check(z.minLength(100)),
  duration: z.string(),
  level: z.enum(['Advanced', 'Basic', 'Intermediate']),
  image: z.union([z.string(), z.instanceof(File)]),
  exercises: z.array(exerciseSchema),
})

export type CreateTopicFormSchema = z.infer<typeof createTopicFormSchema>
