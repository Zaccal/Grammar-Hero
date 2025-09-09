import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/createTopic')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="container mt-10">
      <Input className="mb-6" variant={'lg'} placeholder="Topic title" />
      <Textarea variant={'lg'} placeholder="Topic short description" />

      <Separator className="my-6" />
    </div>
  )
}
