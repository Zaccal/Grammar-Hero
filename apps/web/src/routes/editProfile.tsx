import { createFileRoute } from '@tanstack/react-router'
import { EditProfile } from '@/components/EditProfile/index'
import { authClient } from '@/lib/auth-client'
import ensureSession from '@/middleware'

export const Route = createFileRoute('/editProfile')({
  component: RouteComponent,
  loader: async () => {
    const session = await ensureSession()
    const { data: account, error } = await authClient.listAccounts()
    if (error) {
      throw error
    }

    return { user: session.user, account: account[0] }
  },
})

function RouteComponent() {
  const { user, account } = Route.useLoaderData()

  return (
    <section className="container py-24">
      <EditProfile.Root user={user}>
        <EditProfile.AvatarField initalState={user.image} />
        <EditProfile.NameField />
        <EditProfile.EmailField currentEmail={user.email} />
        {account.providerId === 'credential' && <EditProfile.PasswordField />}
        <EditProfile.Submit />
      </EditProfile.Root>
    </section>
  )
}
