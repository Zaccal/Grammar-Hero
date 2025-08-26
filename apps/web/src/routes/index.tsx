import { authClient } from '@/lib/auth-client'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomeComponent,
  beforeLoad: async () => {
    const { data, error } = await authClient.getSession()
    if (error || !data) {
      throw redirect({
        to: '/login',
      })
    }
  },
})

function HomeComponent() {
  return <></>
}
