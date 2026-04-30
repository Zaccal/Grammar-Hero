import type { ButtonProps } from '../ui/button'
import { Lightbulb } from 'lucide-react'
import { Button } from '../ui/button'
import { ExercisesContext } from './ExercisesContext'
import { ExercisesStore } from './store'

export function ExercisesHint({ children, ...props }: ButtonProps) {
  const currentIndex = ExercisesStore.use(state => state.currentExerciseIndex)
  const isShowHint = ExercisesStore.use(state => state.isShowHint)
  const exercise = ExercisesContext.useSelect(state => state.exercises)[
    currentIndex
  ]

  if (!exercise.hint) {
    return null
  }

  return (
    <Button
      onClick={() =>
        ExercisesStore.set(state => ({ isShowHint: !state.isShowHint }))
      }
      title="Show hint"
      {...props}
      size="icon"
      variant={isShowHint ? 'primary' : 'outline'}
    >
      {children ?? <Lightbulb />}
    </Button>
  )
}
