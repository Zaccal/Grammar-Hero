import type { Topic } from '@server/routers/topics/topics.types'
import { createContext } from '@/hooks'

export const topicsContext = createContext<Topic>()
