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
import { Controller } from 'react-hook-form'
import { FormControl, FormItem } from '../ui/form'
import { createTopicFormContext } from './CreateTopicFormContext'
import '@mdxeditor/editor/style.css'

interface CreateTopicFormMarkdownEditorProps {
  className?: string
}

export function CreateTopicFormMarkdownEditor({
  className,
}: CreateTopicFormMarkdownEditorProps) {
  const form = createTopicFormContext.useSelect(state => state.form)
  const editorRef = createTopicFormContext.useSelect(
    state => state.markdownEditorRef
  )
  const isPending = createTopicFormContext.useSelect(state => state.isPending)

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
