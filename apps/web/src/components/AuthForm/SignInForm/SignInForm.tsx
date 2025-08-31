import { useForm } from 'react-hook-form'
import { signInSchema, type SignInSchema } from '@/schemas/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '../../ui/form'
import SocialForm from '../SocialForm'
import { authClient } from '@/utils/auth-client'
import { toast } from 'sonner'
import SignInFormFields from './SignInFormFields'
import DividerSocial from '../DividerSocial'
import SignInFormHeader from './SignInFormHeader'
import SignInFormFooter from './SignInFormFooter'
import { useNavigate } from '@tanstack/react-router'

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
