import type { AppRouter } from '@server/routers'
import type { InfinityPaginationTopics } from '@server/routers/profile/profile.types'
import type { PaginationShema } from '@server/schemas/pagination.schema'
import type { UseInfiniteQueryResult } from '@tanstack/react-query'
import type { TRPCClientErrorLike } from '@trpc/client'
import type { TRPCInfiniteData } from '@trpc/tanstack-react-query'
import { createContext } from '@/hooks/index'

export interface PaginationTopicsContextProps {
  query: UseInfiniteQueryResult<
    TRPCInfiniteData<PaginationShema, InfinityPaginationTopics>,
    TRPCClientErrorLike<AppRouter>
  >
}

export const PaginationTopicsContext =
  createContext<PaginationTopicsContextProps>()
