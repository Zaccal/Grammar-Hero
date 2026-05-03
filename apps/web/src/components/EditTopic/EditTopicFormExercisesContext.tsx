import type {
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayMove,
  UseFieldArrayRemove,
} from 'react-hook-form'
import type { CreateTopicFormSchema as EditTopicFormSchema } from '@/schemas/createTopicForm.schema'
import { createContext, use } from 'react'

interface EditTopicFormExercisesContextProps {
  fields: FieldArrayWithId<EditTopicFormSchema, 'exercises'>[]
  move: UseFieldArrayMove
  remove: UseFieldArrayRemove
  append: UseFieldArrayAppend<EditTopicFormSchema, 'exercises'>
}

export const EditTopicFormExercisesContext =
  createContext<EditTopicFormExercisesContextProps | null>(null)

export function useExercisesContext() {
  const context = use(EditTopicFormExercisesContext)
  if (!context) {
    throw new Error(
      'useExercisesListContext must be used inside EditTopicFormExercises'
    )
  }
  return context
}
