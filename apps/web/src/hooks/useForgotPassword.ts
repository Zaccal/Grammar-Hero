import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { authClient } from '@/lib/auth-client'

const FORGOT_PASSWORD_MUTATION_KEY = ['forgot-password']

interface UseForgotPasswordProps {
  onSuccess?: () => void | Promise<void>
}

export function useForgotPassword(options?: UseForgotPasswordProps) {
  return useMutation({
    mutationKey: FORGOT_PASSWORD_MUTATION_KEY,
    mutationFn: async ({ email }: { email: string }) => {
      const { data, error } = await authClient.forgetPassword.emailOtp({
        email,
      })
      if (error) {
        throw error
      }
      return data
    },
    onSuccess: () => {
      options?.onSuccess?.()
    },
    onError: error => {
      toast.error('Failed to send OTP', {
        description: error.message,
      })
    },
  })
}

interface UseVerifyOtpProps extends UseForgotPasswordProps {
  type?: 'sign-in' | 'email-verification' | 'forget-password'
}

export function useVerifyOtp(options?: UseVerifyOtpProps) {
  return useMutation({
    mutationKey: FORGOT_PASSWORD_MUTATION_KEY,
    mutationFn: async ({ email, otp }: { email: string; otp: string }) => {
      const { data, error } = await authClient.emailOtp.checkVerificationOtp({
        email,
        otp,
        type: options?.type ?? 'forget-password',
      })
      if (error) {
        throw error
      }
      return data
    },
    onSuccess: () => {
      options?.onSuccess?.()
    },
    onError: error => {
      toast.error('Failed to verify OTP', {
        description: error.message,
      })
    },
  })
}
