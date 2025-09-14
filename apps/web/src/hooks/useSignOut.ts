import { authClient } from '@/lib/auth-client'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useNavigate } from '@tanstack/react-router'

export function useSignOut() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: () => authClient.signOut(),
    onSuccess: () => {
      toast.success('Goodbye! I hope you come back soon 🦕')
      navigate({ to: '/sign-in' })
    },
    onError: error => {
      toast.error('Something went wrong, please try again.', {
        description: error.message,
      })
    },
  })
}
