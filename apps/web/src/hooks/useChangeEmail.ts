import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useLocation } from '@tanstack/react-router'
import { toast } from 'sonner'
import { authClient } from '@/lib/auth-client'
import { sessionQueryKey } from './useSession'

export const CHANGE_EMAIL_MUTATION_KEY = ['changeEmail']

export interface UseChangeEmailProps {
  callbackPath?: string
  onSuccess?: () => void
  onError?: (error: Error) => void
}

export function useChangeEmail(options?: UseChangeEmailProps) {
  const { pathname } = useLocation()
  const redirectTo = options?.callbackPath || window.location.origin + pathname
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: CHANGE_EMAIL_MUTATION_KEY,
    mutationFn: async (newEmail: string) => {
      const { data, error } = await authClient.changeEmail({
        newEmail,
        callbackURL: redirectTo,
      })

      if (error) {
        throw error
      }

      return data
    },
    onSuccess: () => {
      options?.onSuccess?.()
      queryClient.invalidateQueries({
        queryKey: sessionQueryKey,
      })
      toast.success('Email has changed successfully!')
    },
    onError: error => {
      options?.onError?.(error)
      toast.error('Something went wrong!', {
        description: error.message,
      })
    },
  })
}
