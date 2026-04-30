import type { Exercise } from '@server/routers/topics/topics.types'
import type { AnswerSchema } from '@server/schemas/topics.schema'

export interface SelectedAnswer {
  exercise: Exercise
  answer: AnswerSchema & { id: string }
}

export interface Result {
  selectedAnswers: SelectedAnswer[]
  topicId: string
}
