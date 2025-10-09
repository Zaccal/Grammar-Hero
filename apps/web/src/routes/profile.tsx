import { createFileRoute, Link } from '@tanstack/react-router'
import { Bookmark, BriefcaseBusiness, Heart, Pen, Upload } from 'lucide-react'
import { User } from '@/components/Profile/User/index'
import { Works } from '@/components/Profile/Works'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ensureSession from '@/middleware'

export const Route = createFileRoute('/profile')({
  component: RouteComponent,
  loader: ensureSession,
})

function RouteComponent() {
  const { user } = Route.useLoaderData()

  return (
    <section className="container pt-24">
      <User.Root user={user}>
        <User.Avatar />
        <User.Details>
          {/* Create a route editProfile */}
          <Button size="lg" variant="outline">
            <Pen />
            Edit profile
          </Button>
        </User.Details>
      </User.Root>

      <Tabs defaultValue="works" className="mt-12 text-sm">
        <ScrollArea orentation="horizontal" aria-orientation="horizontal" className="w-full whitespace-nowrap">
          <TabsList variant="line" className="min-w-sm ">
            <TabsTrigger value="works">
              <BriefcaseBusiness /> Works
            </TabsTrigger>
            <TabsTrigger value="bookmarks">
              <Bookmark /> Bookmarks
            </TabsTrigger>
            <TabsTrigger value="likes">
              <Heart /> Liked Topics
            </TabsTrigger>
          </TabsList>
        </ScrollArea>

        <TabsContent value="works" className="mt-8">
          <Works.Root>
            <Works.Empty />
          </Works.Root>
        </TabsContent>
        <TabsContent value="bookmarks">
          bookmarks
        </TabsContent>
        <TabsContent value="likes">
          likes
        </TabsContent>
      </Tabs>
    </section>
  )
}
