import { cn } from '@/lib/utils'
import type { AnswerSchema } from '@/schemas/createTopicForm.schema'
import { getRandomColor } from '@/utils'
import { useState } from 'react'
import { ExercisesStore } from '../store'

interface ExercisesItemProps {
  answer: AnswerSchema
  exerciseId: string
  index: number
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

export function ExercisesItem({
  answer,
  index,
  exerciseId,
}: ExercisesItemProps) {
  const letter = ALPHABET[index]
  const isSelected = ExercisesStore.use(state =>
    state.selectedAnswers.some(selected => selected.id === answer.id)
  )

  function onSelect() {
    ExercisesStore.set(state => {
      const alreadySelected = state.selectedAnswers.some(
        selected => selected.id === answer.id
      )

      if (alreadySelected) {
        return {
          ...state,
          selectedAnswers: state.selectedAnswers.filter(
            a => a.id !== answer.id
          ),
        }
      } else {
        return {
          ...state,
          selectedAnswers: [
            ...state.selectedAnswers.filter(a => a.exerciseId !== exerciseId),
            { ...answer, exerciseId },
          ],
        }
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
        {letter}
      </span>
      <p className="flex-1">{answer.text}</p>
    </div>
  )
}
