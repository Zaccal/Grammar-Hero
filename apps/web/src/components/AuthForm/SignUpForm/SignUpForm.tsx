import type { SignUpSchema } from '@/schemas/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { useSignUp } from '@/hooks/useSignUp'
import { signUpSchema } from '@/schemas/auth.schema'
import DividerSocial from '../DividerSocial'
import SocialForm from '../SocialForm/SocialForm'
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
  const { mutateAsync: signUp } = useSignUp({
    onSuccess: () => {
      navigate({
        to: '/otp-page',
      })
    },
  })

  async function onSubmit(data: SignUpSchema) {
    await signUp(data)
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
