import { createStore } from '@/hooks/createStore'
import type { AnswerSchema } from '@/schemas/createTopicForm.schema'

type SelectedAnswers = AnswerSchema & {
  exerciseId: string
}

interface ExercisesStoreProps {
  currentExerciseState: number
  selectedAnswers: SelectedAnswers[]
}

export const ExercisesStore = createStore<ExercisesStoreProps>({
  currentExerciseState: 0,
  selectedAnswers: [],
})
