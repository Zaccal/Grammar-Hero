import type { CreateTopicFormSchema as EditTopicFormSchema } from '@/schemas/createTopicForm.schema'
import { createContext } from '@/hooks'

export const EditTopicContext = createContext<EditTopicFormSchema>()
