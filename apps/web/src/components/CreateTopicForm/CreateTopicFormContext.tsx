import type { MDXEditorMethods } from '@mdxeditor/editor'
import type { UseFormReturn } from 'react-hook-form'
import type { CreateTopicFormSchema } from '@/schemas/createTopicForm.schema'
import { createContext } from '@/hooks/index'

interface CreateTopicFormContext {
  form: UseFormReturn<CreateTopicFormSchema>
  markdownEditorRef: React.RefObject<MDXEditorMethods | null>
  isPending: boolean
}

export const createTopicFormContext = createContext<CreateTopicFormContext>()
