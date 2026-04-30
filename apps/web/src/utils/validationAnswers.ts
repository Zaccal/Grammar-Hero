import type { Exercise } from '@server/routers/topics/topics.types'
import type { SelectedAnswer } from '@/types/result.type'

export function validateAnswers(
  selectedAnswers: SelectedAnswer[],
  exercises: Exercise[]
) {
  return exercises.every(exercise =>
    selectedAnswers.some(selected => selected.exercise.id === exercise.id)
  )
}
