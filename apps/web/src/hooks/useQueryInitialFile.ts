import { useQuery } from '@tanstack/react-query'
import { getServerImage } from '@/utils'

export function useQueryInitalFile(url: string) {
  return useQuery({
    queryKey: ['inital-file', url],
    queryFn: async () => {
      const response = await fetch(getServerImage(url), {
        credentials: 'include',
      })
      if (!response.ok) {
        throw new Error('Failed to fetch user avatar')
      }
      return response.json()
    },
  })
}
