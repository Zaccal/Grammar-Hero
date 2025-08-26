import SignUpForm from '@/components/AuthForm/SignUpForm/SignUpForm'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/sign-up')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <section className="flex items-center justify-center min-h-screen px-4">
        <SignUpForm />
      </section>
    </>
  )
}
