import type { UserUpdate } from '@/types/userUpdate.type'
import { useMutation } from '@tanstack/react-query'
import { authClient } from '@/lib/auth-client'

export function useUpdateUser() {
  return useMutation({
    mutationFn: (data: UserUpdate) => authClient.updateUser(data),
  })
}
