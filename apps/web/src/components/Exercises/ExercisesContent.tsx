import type { AnswerSchema } from '@/schemas/createTopicForm.schema'
import { ExercisesContext } from './ExercisesContext'

interface ExercisesContentProps {
  children: (
    answer: AnswerSchema,
    index: number,
    exerciseId: string
  ) => React.ReactNode
  currentExerciseIndex: number
}

export function ExercisesContent({
  children,
  currentExerciseIndex,
}: ExercisesContentProps) {
  const exercise = ExercisesContext.useSelect(state => state.exercises)[
    currentExerciseIndex
  ]
  const answers = exercise.answers

  return (
    <div>
      <div className="p-9 bg-pink-200 rounded-md border-pink-400 border-2 my-10">
        <p className="font-semibold">{exercise.question}</p>
      </div>
      <div className="space-y-4">
        {answers.map((answer, index) => children(answer, index, exercise.id))}
      </div>
    </div>
  )
}
