import { useQuery } from '@tanstack/react-query'
import { authClient } from '@/lib/auth-client'

export const SESSION_QUERY_KEY = ['session']

export function useSession() {
  return useQuery({
    queryKey: SESSION_QUERY_KEY,
    queryFn: async () => {
      const { data, error } = await authClient.getSession()
      if (error) {
        throw error
      }
      return data
    },
  })
}
