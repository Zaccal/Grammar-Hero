import { MorphingDialog } from '../ui/morphing-dialog'
import { createContext } from '@/hooks'
import type { Topic } from '@server/routers/topics/topics.types'

export const topicsContext = createContext<Topic>()
interface TopicsProps {
  topic: Topic
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
