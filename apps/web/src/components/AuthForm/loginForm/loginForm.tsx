import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { signInSchema, type SignInSchema } from '@/schemas/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '../../ui/form'
import LoginFormFields from './loginFormFields'
import SocialForm from '../SocialForm'
import { authClient } from '@/lib/auth-client'
import { toast } from 'sonner'

function LoginForm() {
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
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mb-28 bg-muted h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5  dark:[--color-muted:var(--color-zinc-900)]"
      >
        <div className="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-8 pb-7">
          <div className="text-center">
            <h1 className="mb-1 mt-4 text-xl font-semibold">
              Sign In to Dino Account!
            </h1>
            <p className="text-muted-foreground text-sm">
              Welcome back! Sign in to continue
            </p>
          </div>

          <LoginFormFields form={form} />

          <div className="my-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            <hr className="border-dashed" />
            <span className="text-muted-foreground text-xs">
              Or continue With
            </span>
            <hr className="border-dashed" />
          </div>

          <SocialForm />
        </div>

        <div className="p-3">
          <p className="text-accent-foreground text-center text-sm">
            Don't have an account ?
            <Button asChild variant="link" className="px-2">
              <Link to="/register">Create account</Link>
            </Button>
          </p>
        </div>
      </form>
    </Form>
  )
}

export default LoginForm
