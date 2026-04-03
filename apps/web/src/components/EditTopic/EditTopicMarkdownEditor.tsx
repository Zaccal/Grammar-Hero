import type { CreateTopicFormSchema as EditTopicFormSchema } from '@/schemas/createTopicForm.schema'
import {
  headingsPlugin,
  KitchenSinkToolbar,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
} from '@mdxeditor/editor'
import { Controller, useFormContext } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { FormControl, FormItem } from '../ui/form'

interface EditTopicMarkdownEditorProps {
  className?: string
}

export function EditTopicMarkdownEditor({
  className,
}: EditTopicMarkdownEditorProps) {
  const form = useFormContext<EditTopicFormSchema>()

  return (
    <div
      className={cn(className, form.formState.isSubmitting ? 'disabled' : '')}
    >
      <Controller
        control={form.control}
        name="content"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <MDXEditor
                // ref={editorRef}
                placeholder="Start typing..."
                onChange={value => {
                  field.onChange(value)
                }}
                className={className}
                markdown={field.value ?? ''}
                contentEditableClassName="markdown-typography"
                plugins={[
                  headingsPlugin(),
                  listsPlugin(),
                  quotePlugin(),
                  thematicBreakPlugin(),
                  markdownShortcutPlugin(),
                  linkPlugin(),
                  linkDialogPlugin(),
                  tablePlugin(),
                  toolbarPlugin({
                    toolbarClassName: 'markdown-editor-toolbar',
                    toolbarContents: () => <KitchenSinkToolbar />,
                  }),
                ]}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  )
}
