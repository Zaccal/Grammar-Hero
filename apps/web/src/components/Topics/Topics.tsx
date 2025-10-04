import type { Topic as TypeTopic } from '@server/routers/topics/topics.types'
import { MorphingDialog } from '../ui/morphing-dialog'
import { topicsContext } from './TopicsContext'

interface TopicsProps {
  topic: TypeTopic
  children: React.ReactNode | React.ReactNode[]
}

export function Topic({ children, topic }: TopicsProps) {
  return (
    <topicsContext.Provider initialValue={topic}>
      <MorphingDialog
        transition={{
          type: 'spring',
          bounce: 0.05,
          duration: 0.25,
        }}
      >
        {children}
      </MorphingDialog>
    </topicsContext.Provider>
  )
}
