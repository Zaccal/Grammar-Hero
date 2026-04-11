import type {
  CreateTopicFormSchema,
  ExerciseSchema,
} from '@/schemas/createTopicForm.schema'
import { DragDropProvider } from '@dnd-kit/react'
import { isSortable } from '@dnd-kit/react/sortable'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { CreateTopicFormExercisesListContext } from './CreateTopicFormExercisesListContext'

interface CreateTopicFormExercisesListProps {
  children: (exercies: ExerciseSchema, index: number) => React.ReactNode
}

export function CreateTopicFormExercisesList({
  children,
}: CreateTopicFormExercisesListProps) {
  const form = useFormContext<CreateTopicFormSchema>()
  const { fields, move, remove, update } = useFieldArray({
    control: form.control,
    name: 'exercises',
  })

  return (
    <CreateTopicFormExercisesListContext.Provider
      initialValue={{ remove, update }}
    >
      <DragDropProvider
        onDragEnd={event => {
          if (event.canceled) { return }
          const { source } = event.operation
          if (isSortable(source)) {
            const { initialIndex, index } = source
            if (initialIndex !== index) {
              move(initialIndex, index)
            }
          }
        }}
      >
        <div className="space-y-6">
          {fields.map((exercise, index) => children(exercise, index))}
        </div>
      </DragDropProvider>
    </CreateTopicFormExercisesListContext.Provider>
  )
}
