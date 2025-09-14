import SignUpFormFields from './SignUpFormFields'
import SocialForm from '../SocialForm'
import DividerSocial from '../DividerSocial'
import SignUpFormHeader from './SignUpFormHeader'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signUpSchema, type SignUpSchema } from '@/schemas/auth.schema'
import { Form } from '@/components/ui/form'
import SignUpFormFooter from './SignUpFormFooter'
import { authClient } from '@/lib/auth-client'
import { toast } from 'sonner'
import { useNavigate } from '@tanstack/react-router'

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
