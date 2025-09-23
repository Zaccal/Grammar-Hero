import type { UseFormReturn } from 'react-hook-form'
import { createContext } from '@/hooks/index'
import type { CreateTopicFormSchema } from '@/schemas/createTopicForm.schema'
import type { MDXEditorMethods } from '@mdxeditor/editor'

interface CreateTopicFormContext {
  form: UseFormReturn<CreateTopicFormSchema>
  markdownEditorRef: React.RefObject<MDXEditorMethods | null>
}

export const createTopicFormContext = createContext<CreateTopicFormContext>()
