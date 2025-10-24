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
        <EditProfileForm.DisplayUsername />
        <EditProfileForm.SaveButton />
      </EditProfileForm.Root>
    </section>
  )
}
