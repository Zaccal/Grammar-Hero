import SignInForm from '@/components/AuthForm/SignInForm/SignInForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sign-in')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <section className="flex items-center justify-center min-h-screen px-4">
        <SignInForm />
      </section>
    </>
  )
}
