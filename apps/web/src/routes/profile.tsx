import { createFileRoute } from '@tanstack/react-router'
import { ensureSession } from '@/middleware'

export const Route = createFileRoute('/profile')({
  component: RouteComponent,
  loader: ensureSession
})

function RouteComponent() {
  return <div>Hello "/profile"!</div>
}
