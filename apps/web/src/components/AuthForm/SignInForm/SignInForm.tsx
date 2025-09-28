import type { SignInSchema } from '@/schemas/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { authClient } from '@/lib/auth-client'
import { signInSchema } from '@/schemas/auth.schema'
import { Form } from '../../ui/form'
import DividerSocial from '../DividerSocial'
import SocialForm from '../SocialForm'
import SignInFormFields from './SignInFormFields'
import SignInFormFooter from './SignInFormFooter'
import SignInFormHeader from './SignInFormHeader'

function SignInForm() {
  const navigate = useNavigate()
  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(data: SignInSchema) {
    await authClient.signIn.email(data, {
      onError: ({ error }) => {
        toast.error('Something went wrong, please try again.', {
          description: error.message,
        })
      },
      onSuccess: () => {
        toast.success('Great to see you again! 🦕', {
          description: 'You have successfully signed in. Let’s keep learning!',
        })
        form.reset()
        navigate({ to: '/' })
      },
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mb-28 bg-muted h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5  dark:[--color-muted:var(--color-zinc-900)]"
      >
        <div className="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-8 pb-7">
          <SignInFormHeader />

          <SignInFormFields form={form} />

          <DividerSocial />

          <SocialForm />
        </div>

        <SignInFormFooter />
      </form>
    </Form>
  )
}

export default SignInForm
