import { createFileRoute, redirect } from '@tanstack/react-router'
import SignUpForm from '@/components/AuthForm/SignUpForm/SignUpForm'
import { Background } from '@/components/ui/background'
import { authClient } from '@/lib/auth-client'

export const Route = createFileRoute('/sign-up')({
  component: RouteComponent,
  beforeLoad: async () => {
    const { data: session, error } = await authClient.getSession()
    if (session || error) {
      throw redirect({
        to: '/',
      })
    }
  },
})

function RouteComponent() {
  return (
    <Background>
      <section className="flex items-center justify-center min-h-screen px-4">
        <SignUpForm />
      </section>
    </Background>
  )
}
