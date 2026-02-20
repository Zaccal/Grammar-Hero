import { createFileRoute, Link } from '@tanstack/react-router'
import { zodValidator } from '@tanstack/zod-adapter'
import { BadgeCheck, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { SuccessSchema } from '@/schemas/success.schema'

export const Route = createFileRoute('/success')({
  component: RouteComponent,
  validateSearch: zodValidator(SuccessSchema)
})

function RouteComponent() {
  const searchParams = Route.useSearch()

  return (
    <div>
      <Card className="max-w-sm mx-auto mt-16">
        <CardHeader>
          <div className="mx-auto w-fit p-6 bg-transparent border-green-600/15 border-6 rounded-full mb-4">
            <div className="bg-green-600 w-fit text-green-50 rounded-full p-6">
              <Check size={32} />
            </div>
          </div>
          <CardTitle className="text-center mb-2">{searchParams.title}</CardTitle>
          <CardDescription className="text-center">{searchParams.description}</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent>
          <p className="mt-2 flex items-start gap-2 p-4 bg-green-600/10 rounded-md text-green-600">
            <BadgeCheck size={42} />
            {searchParams.message}
          </p>
        </CardContent>
        <Separator />
        <CardFooter>
          <Button asChild fullWidth>
            <Link to="/">Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
