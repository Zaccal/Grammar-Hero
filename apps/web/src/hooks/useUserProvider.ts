import { useQuery } from '@tanstack/react-query'
import { trpc } from '@/lib/trpc'
import { useSession } from './useSession'

export const USER_PROVIDER_QUERY_KEY = ['user-provider']

// TODO:
// ! Change the query options to include the user ID
// ! It fetches the user's provider information for every refresh
export function useUserProvider() {
  const { data: session } = useSession()

  return useQuery(trpc.account.getProvider.queryOptions(session?.user.id, {
    enabled: !!session?.user.id,
    staleTime: Infinity,
    gcTime: Infinity,
  }))
}
