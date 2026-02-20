import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { toast } from 'sonner'
import { authClient } from '@/lib/auth-client'
import { SUCCESS_DELETING_ACCOUNT } from '@/lib/constants'

export const USE_DELETE_ACCOUNT_MUTATION_KEY = ['deleting-account']

export function useDeleteAccount(options?: UseMutationOptions) {
  const router = useRouter()
  return useMutation({
    mutationKey: USE_DELETE_ACCOUNT_MUTATION_KEY,
    mutationFn: async () => {
      const params = router.buildLocation({
        to: '/success',
        search: SUCCESS_DELETING_ACCOUNT,
      })
      const promise = authClient.deleteUser({
        callbackURL: import.meta.env.VITE_CLIENT_URL + params.href,
      })

      toast.promise(promise, {
        loading: 'Sending confirmation email',
        success: 'Email has been sent',
        error: 'Failed to delete account',
      })

      const { data, error } = await promise
      if (error) {
        throw error
      }
      return data
    },
    onError: (error, variables, onMutationResult, context) => {
      toast.error('Failed to delete account', {
        description: error.message,
      })
      options?.onError?.(error, variables, onMutationResult, context)
    },
    ...options,
  })
}
