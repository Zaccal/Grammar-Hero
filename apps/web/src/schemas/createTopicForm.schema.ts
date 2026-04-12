import { z } from 'zod'

export const answerSchema = z.object({
  id: z.string(),
  text: z.string(),
  isCorrect: z.boolean(),
})

export type AnswerSchema = z.infer<typeof answerSchema>

export const exerciseSchema = z.object({
  id: z.string(),
  question: z.string().min(1, "Please enter a question"),
  answers: z.array(answerSchema)
    .min(2, "Please provide at least 2 answers")
    .refine((answers) => answers.some((answer) => answer.isCorrect), {
      message: "Please provide at least one correct answer",
    }),
  explanation: z.string().optional(),
  hint: z.string().optional(),
  isMultipleChoice: z.boolean().optional(),
})

export type ExerciseSchema = z.infer<typeof exerciseSchema>

export const createTopicFormSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(100),
  shortDescription: z.string().min(56),
  content: z.string().min(100),
  duration: z.string(),
  level: z.enum(['Advanced', 'Basic', 'Intermediate']),
  image: z.union([z.string(), z.instanceof(File)]),
  exercises: z.array(exerciseSchema),
})

export type CreateTopicFormSchema = z.infer<typeof createTopicFormSchema>
