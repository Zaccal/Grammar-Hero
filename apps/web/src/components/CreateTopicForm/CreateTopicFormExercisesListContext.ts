import type { UseFieldArrayRemove, UseFieldArrayUpdate } from 'react-hook-form'
import type { CreateTopicFormSchema } from '@/schemas/createTopicForm.schema'
import { createContext } from '@/hooks'

interface CreateTopicFormExercisesListContextProps {
  remove: UseFieldArrayRemove
  update: UseFieldArrayUpdate<CreateTopicFormSchema, 'exercises'>
}

export const CreateTopicFormExercisesListContext =
  createContext<CreateTopicFormExercisesListContextProps>()
