import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  quotePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
  linkPlugin,
  linkDialogPlugin,
  type MDXEditorMethods,
  type MDXEditorProps,
  tablePlugin,
  InsertTable,
} from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
import { FormControl, FormField, FormItem } from '../ui/form'
import { createTopicFormContext } from './CreateTopicForm'
import { useFileUploadMutationState } from '@/hooks/index'
import { useRef } from 'react'
import { Button } from '../ui/button'

interface CreateTopicFormMarkdownEditorProps {
  className?: string
}

export const CreateTopicFormMarkdownEditor = ({
  className,
}: CreateTopicFormMarkdownEditorProps) => {
  const form = createTopicFormContext.useSelect(state => state.form)
  const editorRef = createTopicFormContext.useSelect(
    state => state.markdownEditorRef
  )
  const { isPending } = useFileUploadMutationState()

  return (
    <div className={isPending ? 'disabled' : ''}>
      <FormField
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
                  editorRef.current?.setMarkdown(value)
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
                    toolbarContents: () => (
                      <>
                        <UndoRedo />
                        <BoldItalicUnderlineToggles />
                        <InsertTable />
                        <BlockTypeSelect />
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
