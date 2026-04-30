import type { Exercise } from '@server/routers/topics/topics.types'
import type { AnswerSchema } from '@/schemas/createTopicForm.schema'
import { ExercisesContext } from './ExercisesContext'

interface ExercisesContentProps {
  children: (
    answer: AnswerSchema,
    index: number,
    exercise: Exercise
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
      <div className="my-10">
        {exercise.isMultipleChoice && (
          <span className="text-primary">Is Multiple Choice</span>
        )}
        <div className="p-9 mt-4 bg-pink-200 rounded-md border-pink-400 border-2">
          <p className="font-semibold">{exercise.question}</p>
        </div>
      </div>
      <div className="space-y-4">
        {answers.map((answer, index) => children(answer, index, exercise))}
      </div>
    </div>
  )
}
