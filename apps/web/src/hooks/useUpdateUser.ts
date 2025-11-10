import type { UserUpdate } from '@/types/userUpdate.type'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authClient } from '@/lib/auth-client'
import { sessionQueryKey } from './useSession'

export function useUpdateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UserUpdate) => authClient.updateUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sessionQueryKey })
    },
  })
}
