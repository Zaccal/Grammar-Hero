import type { Topic } from '@server/routers/topics/topics.types'
import { createContext } from '@/hooks'

interface TopicsContextType extends Topic {
  searchParams?: Record<string, string | string[] | undefined>
}

export const topicsContext = createContext<TopicsContextType>()
