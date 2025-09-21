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
    <>
      <FormField
        control={form.control}
        name="content"
        render={({ field }) => (
          <FormItem>
            <FormMessage className="mt-4" />
            <FormControl
              className={isPending ? 'opacity-50 cursor-not-allowed' : ''}
            >
              <MDXEditor
                className="markdown-editor"
                placeholder="Start typing..."
                onChange={field.onChange}
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
    </>
  )
}
