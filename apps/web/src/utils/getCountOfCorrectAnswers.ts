import type { SelectedAnswer } from '@/types/result.type'

export function getCountOfCorrectAnswers(selectedAnswers: SelectedAnswer[]) {
  return selectedAnswers.reduce((score, { answer }) => {
    if (answer.isCorrect) {
      score += 1
    }
    return score
  }, 0)
}
