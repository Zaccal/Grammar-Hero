import type { ExerciseSchema } from '@/schemas/createTopicForm.schema'
import { useSortable } from '@dnd-kit/react/sortable'
import { CircleQuestionMark, GripVertical, Trash } from 'lucide-react'
import { Button } from '../../ui/button'
import { Separator } from '../../ui/separator'
import { useExercisesContext } from '../CreateTopicFormExercisesContext'
import CreateTopicFormExercisesItemAnswers from './CreateTopicFormExercisesItemAnswers'
import CreateTopicFormExercisesItemChoices from './CreateTopicFormExercisesItemChoices'
import CreateTopicFormExercisesItemFooter from './CreateTopicFormExercisesItemFooter'
import CreateTopicFormExercisesItemQuestion from './CreateTopicFormExercisesItemQuestion'

interface CreateTopicFormExercisesItemProps {
  exercise: ExerciseSchema
  index: number
}

export function CreateTopicFormExercisesItem({
  exercise,
  index,
}: CreateTopicFormExercisesItemProps) {
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
        <CreateTopicFormExercisesItemQuestion index={index} />
        <CreateTopicFormExercisesItemChoices index={index} />
        <CreateTopicFormExercisesItemAnswers exerciseIndex={index} />
      </div>

      <Separator className="my-5" />
      {/* Footer */}
      <CreateTopicFormExercisesItemFooter index={index} />
    </div>
  )
}
