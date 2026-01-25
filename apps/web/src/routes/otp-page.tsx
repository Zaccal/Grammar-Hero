import type { OTPSchemaType } from '@/schemas/otp.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { Edit } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { SESSION_QUERY_KEY, useVerifyOtp } from '@/hooks'
import { useTimer } from '@/hooks/useTimer/useTimer'
import { authClient } from '@/lib/auth-client'
import { queryClient } from '@/lib/trpc'
import { OTPSchema } from '@/schemas/otp.schema'
import { AuthRegistrationStore } from '@/stores/authRegistration.store'
import { OTPPropsStore } from '@/stores/otpProps.store'

export const Route = createFileRoute('/otp-page')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const OTPProps = OTPPropsStore.use(state => state)
  const timer = useTimer(60, {
    immediately: false,
  })
  const form = useForm<OTPSchemaType>({
    resolver: zodResolver(OTPSchema),
    defaultValues: {
      otp: '',
    },
  })
  const { mutateAsync: verifyOtp, isPending } = useVerifyOtp({
    onSuccess: async () => {
      AuthRegistrationStore.set({
        email: OTPProps.email,
        otp: form.getValues().otp,
      })

      const { error } = await authClient.signIn.emailOtp({
        email: OTPProps.email,
        otp: form.getValues().otp,
        fetchOptions: {
          onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: SESSION_QUERY_KEY })
          },
        },
      })

      if (error) {
        toast.error('Failed to sign in, please try again')
        navigate({
          to: '/sign-in',
          replace: true,
        })
      }

      navigate({
        to: OTPProps.redirectUrl ?? '/set-password',
        replace: true,
      })
    },
    type: OTPProps.type,
  })

  async function submitHandler(data: OTPSchemaType) {
    await verifyOtp({
      otp: data.otp,
      email: OTPProps.email,
    })
  }

  async function resendHandler() {
    if (!timer.active) {
      timer.start()
      await authClient.emailOtp.sendVerificationOtp({
        email: OTPProps.email,
        type: OTPProps.type,
      })
    }
  }

  return (
    <div className="container mt-32 flex justify-center">
      <Card className="w-full max-w-xs">
        <CardHeader className="text-center">
          <CardTitle>OTP Verification</CardTitle>
          <CardDescription>Enter the OTP sent to your email</CardDescription>
          <Link
            to="/forgot-password"
            className="mx-auto flex items-center gap-2 text-primary text-sm"
          >
            {OTPProps.email} <Edit size={18} />
          </Link>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="space-y-4"
              onSubmit={form.handleSubmit(submitHandler)}
            >
              <FormField
                name="otp"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormMessage />
                    <FormControl>
                      <InputOTP maxLength={6} disabled={isPending} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="space-y-2">
                <Button loading={isPending} type="submit" fullWidth>
                  Verify
                </Button>
                <Button
                  variant="link"
                  type="button"
                  disabled={timer.active}
                  onClick={resendHandler}
                  fullWidth
                >
                  {timer.active
                    ? `You can resend in ${String(timer.minutes).padStart(2, '0')}:${String(timer.seconds).padStart(2, '0')}`
                    : "Didn't receive the OTP?"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
