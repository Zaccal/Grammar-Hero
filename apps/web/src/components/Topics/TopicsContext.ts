import type { Topic } from '@server/routers/topics/topics.types'
import type { FilterParamsSchema } from '@server/schemas/filterParams.schema'
import { createContext } from '@/hooks'

interface TopicsContextType extends Topic {
  searchParams?: Partial<FilterParamsSchema>
}

export const topicsContext = createContext<TopicsContextType>()
