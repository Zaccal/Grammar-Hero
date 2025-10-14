import { useInfiniteQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Bookmark,
  BriefcaseBusiness,
  Ellipsis,
  Heart,
  Menu,
  Pen,
} from 'lucide-react'
import ErrorComponent from '@/components/ErrorComponent'
import { PaginationTopics } from '@/components/Profile/PaginationTopics'
import { ProfileTab } from '@/components/Profile/ProfileTabs/index'
import { User } from '@/components/Profile/User/index'
import { Button } from '@/components/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import { trpc } from '@/lib/trpc'
import ensureSession from '@/middleware'

export const Route = createFileRoute('/profile')({
  component: RouteComponent,
  loader: ensureSession,
})

const LIMIT_OF_TOPICS = 10

function RouteComponent() {
  const { user } = Route.useLoaderData()
  const myTopicsQuery = useInfiniteQuery(
    trpc.profile.getAllMyTopics.infiniteQueryOptions(
      {
        limit: LIMIT_OF_TOPICS,
      },
      {
        getNextPageParam: last => last.nextCursor ?? undefined,
        initialCursor: undefined,
      }
    )
  )

  if (myTopicsQuery.isError)
    return <ErrorComponent error={myTopicsQuery.error} />

  return (
    <section className="container pt-24">
      <User.Root user={user}>
        <User.Avatar />
        <User.Content>
          <User.Displayname />
          {/* Create a route editProfile */}
          <div className="flex gap-3">
            <Button size="lg" variant="outline">
              <Pen />
              Edit profile
            </Button>
            <Button size="lg" variant="outline">
              <Ellipsis />
            </Button>
          </div>
        </User.Content>
      </User.Root>

      <ProfileTab.Root defaultValue="My Topics">
        <ProfileTab.Content icon={<Menu />} value="My Topics">
          <PaginationTopics.Root query={myTopicsQuery}>
            <PaginationTopics.Empty>
              <Empty>
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <BriefcaseBusiness />
                  </EmptyMedia>
                  <EmptyTitle>No Projects Yet</EmptyTitle>
                  <EmptyDescription>
                    Become a contributor! Upload your first topic and join our
                    community of learners and educators
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  <Button asChild>
                    <Link to="/createTopic">Let's create!</Link>
                  </Button>
                </EmptyContent>
              </Empty>
            </PaginationTopics.Empty>
            <PaginationTopics.List>
              <PaginationTopics.Skeleton />
              <PaginationTopics.Render />
            </PaginationTopics.List>
            <PaginationTopics.ShowMore />
            <PaginationTopics.Loader />
          </PaginationTopics.Root>
        </ProfileTab.Content>
        <ProfileTab.Content icon={<Bookmark />} value="Bookmarks">
          Hello World!
        </ProfileTab.Content>
        <ProfileTab.Content icon={<Heart />} value="Liked Topcis">
          Hello World!
        </ProfileTab.Content>
      </ProfileTab.Root>
    </section>
  )
}
