import type { CreateTopicFormSchema } from '@/schemas/createTopicForm.schema'
import {
  BoldItalicUnderlineToggles,
  CreateLink,
  headingsPlugin,
  InsertTable,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  ListsToggle,
  markdownShortcutPlugin,
  MDXEditor,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
} from '@mdxeditor/editor'
import { Controller, useFormContext } from 'react-hook-form'
import { FormControl, FormItem } from '../ui/form'
import { CreateTopicFormContext } from './CreateTopicFormContext'
import '@mdxeditor/editor/style.css'

export interface CreateTopicFormMarkdownEditorProps {
  className?: string
}

export default function CreateTopicFormMarkdownEditor({
  className,
}: CreateTopicFormMarkdownEditorProps) {
  const form = useFormContext<CreateTopicFormSchema>()
  const editorRef = CreateTopicFormContext.useSelect(
    state => state.markdownEditorRef
  )
  const isPending = form.formState.isSubmitting

  return (
    <div className={isPending ? 'disabled' : ''}>
      <Controller
        control={form.control}
        name="content"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <MDXEditor
                ref={editorRef}
                placeholder="Start typing..."
                onChange={value => {
                  field.onChange(value)
                }}
                className={className}
                markdown={field.value ?? ''}
                contentEditableClassName="markdown-typography"
                plugins={[
                  headingsPlugin(),
                  markdownShortcutPlugin(),
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
                        <UndoRedo />
                        <BoldItalicUnderlineToggles />
                        <ListsToggle />
                        <CreateLink />
                        <InsertTable />
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
