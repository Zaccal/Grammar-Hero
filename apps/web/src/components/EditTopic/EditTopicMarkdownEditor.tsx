import type { CreateTopicFormSchema as EditTopicFormSchema } from '@/schemas/createTopicForm.schema'
import {
  BoldItalicUnderlineToggles,
  CreateLink,
  headingsPlugin,
  InsertTable,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  ListsToggle,
  MDXEditor,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
} from '@mdxeditor/editor'
import { Controller, useFormContext } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { FormControl, FormItem } from '../ui/form'

export interface EditTopicMarkdownEditorProps {
  className?: string
}

export default function EditTopicMarkdownEditor({
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
                  linkPlugin(),
                  linkDialogPlugin(),
                  tablePlugin(),
                  toolbarPlugin({
                    toolbarClassName: 'markdown-editor-toolbar',
                    toolbarContents: () => (
                      <>
                        <>
                          <UndoRedo />
                          <BoldItalicUnderlineToggles />
                          <ListsToggle />
                          <CreateLink />
                          <InsertTable />
                        </>
                      </>
                    ),
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
