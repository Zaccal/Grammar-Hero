import type { SelectedAnswer } from '@/types/result.type'
import { createStore } from '@/hooks/createStore'

interface ExercisesStoreProps {
  currentExerciseIndex: number
  selectedAnswers: SelectedAnswer[]
}

export const ExercisesStore = createStore<ExercisesStoreProps>({
  currentExerciseIndex: 0,
  selectedAnswers: [],
})
