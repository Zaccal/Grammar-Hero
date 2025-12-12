import type { UserUpdate } from '@/types/userUpdate.type'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { authClient } from '@/lib/auth-client'
import { sessionQueryKey } from './useSession'

export function useUpdateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: UserUpdate) => {
      const { data: response, error } = await authClient.updateUser(data)
      if (error) { throw error }
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sessionQueryKey })
      toast.success('Profile updated successfully')
    },
    onError: (error) => {
        toast.error('Something went wrong!', {
          description: error.message
        })
    }
  })
}
