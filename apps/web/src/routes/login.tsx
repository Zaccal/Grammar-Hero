import LoginForm from '@/components/AuthForm/loginForm/loginForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <section className="flex items-center justify-center min-h-screen px-4">
        <LoginForm />
      </section>
    </>
  )
}
