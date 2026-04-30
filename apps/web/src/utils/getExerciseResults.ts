import type { SelectedAnswer } from '@/types/result.type'

interface ExerciseResults {
  id: string
  question: string
  answer: string
  rightAnswer: string[]
  explanation: string | null
  isCorrect: boolean
}

export function getExerciseResults(
  selectedAnswers: SelectedAnswer[]
): ExerciseResults[] {
  return selectedAnswers.map(
    ({ exercise: { question, answers, explanation, id }, answer }) => ({
      id,
      question,
      answer: answer.text,
      rightAnswer: answers.filter(a => a.isCorrect).map(a => a.text),
      explanation,
      isCorrect: answer.isCorrect,
    })
  )
}
