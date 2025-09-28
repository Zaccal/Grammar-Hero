import { createFileRoute, redirect } from '@tanstack/react-router'
import SignInForm from '@/components/AuthForm/SignInForm/SignInForm'
import { Background } from '@/components/ui/background'
import { authClient } from '@/lib/auth-client'

export const Route = createFileRoute('/sign-in')({
  component: RouteComponent,
  beforeLoad: async () => {
    const { data: session, error } = await authClient.getSession()
    if (session || error) {
      throw redirect({
        to: '/sign-up',
      })
    }
  },
})

function RouteComponent() {
  return (
    <Background>
      <section className="flex items-center justify-center min-h-screen px-4">
        <SignInForm />
      </section>
    </Background>
  )
}
