import { useQuery } from '@tanstack/react-query'
import { authClient } from '@/lib/auth-client'

export const USE_LIST_ACCOUNTS_QUERY_KEY = ['useListAccount']

export function useListAccounts() {
 return useQuery({
  queryKey: USE_LIST_ACCOUNTS_QUERY_KEY,
  queryFn: async () => {
   const response = await authClient.listAccounts()
   if (response.error) { throw response.error }
   return response.data
  }
 })
}
