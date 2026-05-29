import type { CreateTopicFormMarkdownEditorProps } from './CreateTopicFormMarkdownEditor'
import { lazy, Suspense } from 'react'
import { Skeleton } from '../ui/skeleton'

const CreateTopicFormMarkdownEditor = lazy(
  () => import('./CreateTopicFormMarkdownEditor')
)

export function CreateTopicFormMarkdownEditorWrapper({
  className,
}: CreateTopicFormMarkdownEditorProps) {
  return (
    <Suspense fallback={<Skeleton className="w-full h-64 my-4" />}>
      <CreateTopicFormMarkdownEditor className={className} />
    </Suspense>
  )
}
