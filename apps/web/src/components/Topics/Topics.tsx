import type { Topic as TypeTopic } from '@server/routers/topics/topics.types'
import { lazy, Suspense } from 'react'
import { TopicsContext } from './TopicsContext'
import { TopicSkeleton } from './TopicsSkeleton'

const MorphingDialog = lazy(() =>
  import('../ui/morphing-dialog').then(mod => ({
    default: mod.MorphingDialog,
  }))
)

interface TopicsProps {
  topic: TypeTopic
  children: React.ReactNode | React.ReactNode[]
}

export function Topic({ children, topic }: TopicsProps) {
  return (
    <TopicsContext.Provider initialValue={topic}>
      <Suspense fallback={<TopicSkeleton />}>
        <MorphingDialog
          transition={{
            type: 'spring',
            bounce: 0.05,
            duration: 0.25,
          }}
        >
          {children}
        </MorphingDialog>
      </Suspense>
    </TopicsContext.Provider>
  )
}
