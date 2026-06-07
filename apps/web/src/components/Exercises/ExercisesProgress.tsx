import { Flag } from 'lucide-react'
import { Progress } from '../ui/progress'
import { ExercisesContext } from './ExercisesContext'
import { ExercisesStore } from './store'

export function ExercisesProgress() {
  const exercises = ExercisesContext.useSelect(state => state.exercises)
  const currentExerciseIndex = ExercisesStore.use(
    state => state.currentExerciseIndex
  )
  const progress = ((currentExerciseIndex + 1) / exercises.length) * 100

  return (
    <>
      <p className="mb-2 font-semibold">
        Questions {currentExerciseIndex + 1}/{exercises.length}
      </p>
      <div className="flex items-center gap-4">
        <Progress value={progress} />
        <Flag className="text-orange-400" />
      </div>
    </>
  )
}
