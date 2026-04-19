import type { ResultSchema } from '@/schemas/result.schema'

export function getCountOfCorrectAnswers(selectedAnswers: ResultSchema) {
  return selectedAnswers.reduce((score, answer) => {
    if (answer.isCorrect) {
      score += 1
    }
    return score
  }, 0)
}
