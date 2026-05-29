// import { MorphingDialogTrigger } from '../ui/morphing-dialog'

import { lazy, Suspense } from 'react'

const MorphingDialogTrigger = lazy(() =>
  import('../ui/morphing-dialog').then(mod => ({
    default: mod.MorphingDialogTrigger,
  }))
)

export function TopicsPreview({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <MorphingDialogTrigger>{children}</MorphingDialogTrigger>
    </Suspense>
  )
}
