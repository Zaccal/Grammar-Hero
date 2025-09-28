import type { SignUpSchema } from '@/schemas/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Form } from '@/components/ui/form'
import { authClient } from '@/lib/auth-client'
import { signUpSchema } from '@/schemas/auth.schema'
import DividerSocial from '../DividerSocial'
import SocialForm from '../SocialForm'
import SignUpFormFields from './SignUpFormFields'
import SignUpFormFooter from './SignUpFormFooter'
import SignUpFormHeader from './SignUpFormHeader'

function SignUpForm() {
  const navigate = useNavigate()
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      username: '',
    },
  })

  async function onSubmit(data: SignUpSchema) {
    await authClient.signUp.email(
      {
        ...data,
        name: data.username,
      },
      {
        onSuccess: () => {
          toast.success('Welcome! Your Dino account has been created 🦕🎉')
          form.reset()
          navigate({ to: '/' })
        },
        onError: ({ error }) => {
          toast.error('Something went wrong', {
            description: error.message,
          })
        },
      }
    )
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" bg-muted m-auto h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]"
      >
        <div className="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-8 pb-6">
          <SignUpFormHeader />
          <SignUpFormFields form={form} />
          <DividerSocial />
          <SocialForm />
        </div>
        <SignUpFormFooter />
      </form>
    </Form>
  )
}

export default SignUpForm
