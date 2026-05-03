import type { ExerciseSchema } from '@/schemas/createTopicForm.schema'
import { useSortable } from '@dnd-kit/react/sortable'
import { CircleQuestionMark, GripVertical, Trash } from 'lucide-react'
import { Button } from '../../ui/button'
import { Separator } from '../../ui/separator'
import { useExercisesContext } from '../EditTopicFormExercisesContext'
import EditTopicFormExercisesItemAnswers from './EditTopicFormExercisesItemAnswers'
import EditTopicFormExercisesItemChoices from './EditTopicFormExercisesItemChoices'
import EditTopicFormExercisesItemFooter from './EditTopicFormExercisesItemFooter'
import EditTopicFormExercisesItemQuestion from './EditTopicFormExercisesItemQuestion'

interface EditTopicFormExercisesItemProps {
  exercise: ExerciseSchema
  index: number
}

export function EditTopicFormExercisesItem({
  exercise,
  index,
}: EditTopicFormExercisesItemProps) {
  const { remove } = useExercisesContext()
  const { ref, handleRef } = useSortable({
    id: exercise.id,
    index,
  })

  return (
    <div ref={ref} className="relative border rounded-lg p-4">
      <Button
        ref={handleRef}
        className="absolute -left-10 top-2 cursor-grab"
        variant="ghost"
        size="icon"
      >
        <GripVertical />
      </Button>
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="font-semibold flex items-center gap-2">
          <CircleQuestionMark size={20} />
          Question #{index + 1}
        </span>
        <Button
          type="button"
          onClick={() => remove(index)}
          variant="destructive"
          size="icon"
        >
          <Trash />
        </Button>
      </div>

      {/* Exercise body */}
      <div className="mt-4">
        <EditTopicFormExercisesItemQuestion index={index} />
        <EditTopicFormExercisesItemChoices index={index} />
        <EditTopicFormExercisesItemAnswers exerciseIndex={index} />
      </div>

      <Separator className="my-5" />
      {/* Footer */}
      <EditTopicFormExercisesItemFooter index={index} />
    </div>
  )
}
