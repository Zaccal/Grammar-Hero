import { Flag } from 'lucide-react'
import { useState } from 'react'
import { useDidUpdate } from '@/hooks'
import { Progress } from '../ui/progress'
import { ExercisesContext } from './ExercisesContext'
import { ExercisesStore } from './store'

export function ExercisesProgress() {
  const [progress, setProgress] = useState(0)
  const exercises = ExercisesContext.useSelect(state => state.exercises)
  const currentExerciseIndex = ExercisesStore.use(
    state => state.currentExerciseIndex
  )

  useDidUpdate(() => {
    setProgress((currentExerciseIndex / exercises.length) * 100)
  }, [currentExerciseIndex, exercises])

  return (
    <>
      <p className="mb-2 font-semibold">Questions 1/2</p>
      <div className="flex items-center gap-4">
        <Progress value={progress} />
        <Flag className="text-orange-400" />
      </div>
    </>
  )
}
