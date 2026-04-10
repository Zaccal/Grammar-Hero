import type { MDXEditorMethods } from '@mdxeditor/editor'
import { createContext } from '@/hooks/index'

interface CreateTopicFormContextProps {
  markdownEditorRef: React.RefObject<MDXEditorMethods | null>
}

export const CreateTopicFormContext =
  createContext<CreateTopicFormContextProps>()
