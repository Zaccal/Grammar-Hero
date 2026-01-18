import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { authClient } from '@/lib/auth-client'
import { queryClient } from '@/lib/trpc'

export function useSignOut() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async () => {
      const promise = authClient.signOut()

      toast.promise(promise, {
        loading: 'Signing out...',
        success: 'Goodbye! I hope you come back soon 🦕',
        error: 'Something went wrong, please try again.',
      })

      await promise
    },
    onSuccess: () => {
      queryClient.clear()
      navigate({ to: '/sign-in' })
    },
  })
}
