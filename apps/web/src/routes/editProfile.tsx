import { createFileRoute } from '@tanstack/react-router'
import { EditProfile } from '@/components/EditProfile/index'
import ensureSession from '@/middleware'

export const Route = createFileRoute('/editProfile')({
  component: RouteComponent,
  loader: ensureSession,
})

function RouteComponent() {
  const { user } = Route.useLoaderData()

  return (
    <section className="container py-24">
      <EditProfile.Root user={user}>
        <EditProfile.AvatarField initalState={user.image} />
        <EditProfile.NameField />
        <EditProfile.EmailField currentEmail={user.email} />
        <EditProfile.Submit />
      </EditProfile.Root>
    </section>
  )
}
