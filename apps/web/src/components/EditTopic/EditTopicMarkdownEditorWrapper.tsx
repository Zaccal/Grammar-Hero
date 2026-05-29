import { lazy, Suspense } from 'react'
import type { EditTopicMarkdownEditorProps } from './EditTopicMarkdownEditor'
import { Skeleton } from '../ui/skeleton'

const EditTopicMarkdownEditor = lazy(() => import('./EditTopicMarkdownEditor'))

export default function EditTopicMarkdownEditorWrapper({
  className,
}: EditTopicMarkdownEditorProps) {
  return (
    <Suspense fallback={<Skeleton className="w-full h-64 my-4" />}>
      <EditTopicMarkdownEditor className={className} />
    </Suspense>
  )
}
