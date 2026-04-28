import { Flag } from 'lucide-react'
import { Progress } from '../ui/progress'

export function ExercisesProgress() {
  return (
    <>
      <p className="mb-2 font-semibold">Questions 1/2</p>
      <div className="flex items-center gap-4">
        <Progress value={66} />
        <Flag className="text-orange-400" />
      </div>
    </>
  )
}
