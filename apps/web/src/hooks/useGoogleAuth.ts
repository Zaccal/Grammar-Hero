import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { authClient } from '@/lib/auth-client'

export const GOOGLE_MUTATION_KEY = ['google-auth']

interface UseGoogleAuthOptions {
  callbackUrl?: string
}

export function useGoogleAuth(options?: UseGoogleAuthOptions) {
  return useMutation({
    mutationKey: GOOGLE_MUTATION_KEY,
    mutationFn: async () => {
      return await authClient.signIn.social({
        provider: 'google',
        callbackURL: options?.callbackUrl,
      })
    },
    onError: error => {
      toast.error('Failed to authenticate with Google', {
        description: error.message,
      })
    },
  })
}
