import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/topic/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  return (
    <>
      <div className="container">
        <h1></h1>
      </div>
    </>
  )
}
