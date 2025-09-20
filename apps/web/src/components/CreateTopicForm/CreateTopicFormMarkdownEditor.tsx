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

export const CreateTopicFormMarkdownEditor = ({
  editorRef,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) => {
  return (
    <MDXEditor
      className="markdown-editor"
      placeholder="Start typing..."
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
  )
}
