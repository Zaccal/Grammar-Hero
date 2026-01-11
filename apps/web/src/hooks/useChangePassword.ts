import type { ChangePasswordSchema } from '@/schemas/changePassword.schema'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { authClient } from '@/lib/auth-client'

export const CHANGE_PASSWORD_MUTATION_KEY = ['change-password-key']

export interface UseChangePassword {
  onSuccess: () => void
}

export function useChangePassword(options?: UseChangePassword) {
  return useMutation({
    mutationKey: CHANGE_PASSWORD_MUTATION_KEY,
    mutationFn: async (data: ChangePasswordSchema) => {
      const { data: response, error } = await authClient.changePassword({
        newPassword: data.newPassword,
        currentPassword: data.currentPassword,
        revokeOtherSessions: true,
      })
      if (error) {
        throw error
      }
      return response
    },
    onSuccess: () => {
      options?.onSuccess()
      toast.success('Password updated successfully 🎉')
    },
    onError: error => {
      toast.error('Something went wrong!', {
        description: error.message,
      })
    },
  })
}
