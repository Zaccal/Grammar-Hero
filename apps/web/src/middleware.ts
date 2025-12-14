import { redirect } from '@tanstack/react-router'
import { SESSION_QUERY_KEY } from './hooks'
import { authClient } from './lib/auth-client'
import { queryClient } from './lib/trpc'

export default async function ensureSession() {
  const data = await queryClient.ensureQueryData({
    queryKey: SESSION_QUERY_KEY,
    queryFn: async () => {
      const { data, error } = await authClient.getSession()
      if (error) {
        throw error
      }
      return data
    },
  })

  if (!data?.user) {
    throw redirect({
      to: '/sign-up',
    })
  }

  return data
}
