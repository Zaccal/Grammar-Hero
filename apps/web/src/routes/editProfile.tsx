import { createFileRoute } from '@tanstack/react-router'
import { EditProfileForm } from '@/components/EditProfileForm'
import ensureSession from '@/middleware'

export const Route = createFileRoute('/editProfile')({
  component: RouteComponent,
  loader: ensureSession,
})

function RouteComponent() {
  const { user } = Route.useLoaderData()

  return (
    <section className="container py-24">
      <EditProfileForm.Root user={user}>
        <EditProfileForm.Avatar />
        <div className="space-y-5">
          <EditProfileForm.DisplayUsername />
          <EditProfileForm.ChangeMail />
          <EditProfileForm.ChangePassword />
        </div>
      </EditProfileForm.Root>
    </section>
  )
}
