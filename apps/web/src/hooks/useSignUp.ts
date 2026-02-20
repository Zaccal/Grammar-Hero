import type { SignUpSchema } from '@/schemas/auth.schema'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { authClient } from '@/lib/auth-client'
import { OTPPropsStore } from '@/stores/otpProps.store'

export const USE_SIGN_UP_MUTATION_KEY = ['signUp']

interface UseSignUpProps {
  onSuccess?: <T = unknown>(data: T) => void
}

export function useSignUp(options?: UseSignUpProps) {
  return useMutation({
    mutationKey: USE_SIGN_UP_MUTATION_KEY,
    mutationFn: async (data: SignUpSchema) => {
      const { data: response, error } = await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.username,
        username: data.username,
      })

      if (error) {
        throw error
      }

      return response
    },
    onSuccess: async data => {
      const { error } = await authClient.emailOtp.sendVerificationOtp({
        email: data.user.email,
        type: 'sign-in',
      })
      if (error) {
        toast.error('Failed to send OTP', {
          description: error.message,
        })
        return
      }
      options?.onSuccess?.(data)
      OTPPropsStore.set({
        email: data.user.email,
        redirectUrl: '/',
        type: 'sign-in',
      })
    },
    onError: error => {
      toast.error('Something went wrong', {
        description: error.message,
      })
    },
  })
}
