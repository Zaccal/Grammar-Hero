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
  type MDXEditorMethods,
  type MDXEditorProps,
} from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
import type { ForwardedRef } from 'react'
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { createTopicFormContext } from './CreateTopicForm'
import { useFileUploadMutationState } from '@/hooks/index'

export const CreateTopicFormMarkdownEditor = ({
  editorRef,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) => {
  const form = createTopicFormContext.useSelect(state => state.form)
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
                placeholder="Start typing..."
                onChange={field.onChange}
                contentEditableClassName="markdown-typography"
                plugins={[
                  headingsPlugin(),
                  listsPlugin(),
                  quotePlugin(),
                  thematicBreakPlugin(),
                  markdownShortcutPlugin(),
                  toolbarPlugin({
                    toolbarClassName: 'markdown-editor-toolbar',
                    toolbarContents: () => (
                      <>
                        <UndoRedo />
                        <BoldItalicUnderlineToggles />
                        <BlockTypeSelect />
                      </>
                    ),
                  }),
                ]}
                ref={editorRef}
                {...props}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  )
}
