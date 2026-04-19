import { answerSchema } from '@server/schemas/topics.schema'
import z from 'zod'

export const resultSchema = z.array(
  answerSchema.extend({
    exerciseId: z.string(),
  })
)

export type ResultSchema = z.infer<typeof resultSchema>
