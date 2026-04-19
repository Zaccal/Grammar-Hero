import { createContext } from '@/hooks'
import type { Topic } from '@server/routers/topics/topics.types'

export const ExercisesContext = createContext<Topic>()
