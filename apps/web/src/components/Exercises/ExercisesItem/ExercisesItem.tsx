import type { Exercise } from '@server/routers/topics/topics.types'
import type { AnswerSchema } from '@/schemas/createTopicForm.schema'
import { cn } from '@/lib/utils'
import { getRandomColor } from '@/utils'
import { ExercisesStore } from '../store'

interface ExercisesItemProps {
  answer: AnswerSchema
  exercise: Exercise
  index: number
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

export function ExercisesItem({ answer, index, exercise }: ExercisesItemProps) {
  const letter = ALPHABET[index]
  const isSelected = ExercisesStore.use(state =>
    state.selectedAnswers.some(selected => selected.answer.id === answer.id)
  )

  function onSelect() {
    ExercisesStore.set(state => {
      const alreadySelected = state.selectedAnswers.some(
        selected => selected.answer.id === answer.id
      )

      if (alreadySelected) {
        return {
          ...state,
          selectedAnswers: state.selectedAnswers.filter(
            selected => selected.answer.id !== answer.id
          ),
        }
      }

      return {
        ...state,
        selectedAnswers: [
          ...state.selectedAnswers.filter(selected =>
            exercise.isMultipleChoice
              ? true
              : selected.exercise.id !== exercise.id
          ),
          { exercise, answer },
        ],
      }
    })
  }

  return (
    <div
      className={cn(
        'p-4 bg-secondary rounded-lg flex items-center gap-4 cursor-pointer border-2',
        { 'bg-primary/25': isSelected, 'border-primary': isSelected }
      )}
      onClick={onSelect}
    >
      <span
        className={cn(
          'font-semibold bg-primary/25 flex items-center justify-center rounded-full text-sm aspect-square w-6 h-6',
          getRandomColor()
        )}
      >
        {letter ?? answer.text[0]}
      </span>
      <p className="flex-1">{answer.text}</p>
    </div>
  )
}
