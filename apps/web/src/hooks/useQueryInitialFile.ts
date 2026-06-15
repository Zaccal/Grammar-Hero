import { useQuery } from '@tanstack/react-query'

export function useQueryInitalFile(url: string) {
  return useQuery({
    queryKey: ['inital-file', url],
    queryFn: async () => {
      const response = await fetch(url, {
        credentials: 'include',
      })
      if (!response.ok) {
        throw new Error('Failed to fetch user avatar')
      }
      return response.json()
    },
  })
}
