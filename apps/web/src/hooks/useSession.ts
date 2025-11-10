import { useQuery } from '@tanstack/react-query'
import { authClient } from '@/lib/auth-client'

export const sessionQueryKey = ['session']

export function useSession() {
  return useQuery({
    queryKey: sessionQueryKey,
    queryFn: async () => {
      const { data, error } = await authClient.getSession()
      if (error) {
        throw error
      }
      return data
    },
  })
}
