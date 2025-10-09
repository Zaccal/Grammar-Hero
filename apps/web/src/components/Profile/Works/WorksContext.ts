import type { Topics } from '@server/routers/topics/topics.types'
import { createContext } from '@/hooks'

interface WorksContext {
  topics: Topics
}

export const worksContext = createContext<WorksContext>()
