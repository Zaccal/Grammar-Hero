import type {
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayMove,
  UseFieldArrayRemove,
} from 'react-hook-form'
import type { CreateTopicFormSchema } from '@/schemas/createTopicForm.schema'
import { createContext, use } from 'react'

interface CreateTopicFormExercisesContextProps {
  fields: FieldArrayWithId<CreateTopicFormSchema, 'exercises'>[]
  move: UseFieldArrayMove
  remove: UseFieldArrayRemove
  append: UseFieldArrayAppend<CreateTopicFormSchema, 'exercises'>
}

export const CreateTopicFormExercisesContext =
  createContext<CreateTopicFormExercisesContextProps | null>(null)

export function useExercisesContext() {
  const context = use(CreateTopicFormExercisesContext)
  if (!context) {
    throw new Error(
      'useExercisesListContext must be used inside CreateTopicFormExercises'
    )
}
  return context
}
