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
import { PaginationTopics } from '@/components/PaginationTopics'
import { ProfileTab } from '@/components/ProfileTabs/index'
import QuickEditProfile from '@/components/QuickEditProfile/QuickEditProfile'
import ScrollToTopButton from '@/components/ScrollToTopButton/ScrollToTopButton'
import { Button } from '@/components/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import { User } from '@/components/User/index'
import { QUERY_INPUT, QUERY_OPTION } from '@/lib/constants'
import { trpc } from '@/lib/trpc'
import ensureSession from '@/middleware'

export const Route = createFileRoute('/profile')({
  component: RouteComponent,
  loader: ensureSession,
})

function RouteComponent() {
  const { user } = Route.useLoaderData()

  const myTopicsQuery = useInfiniteQuery(
    trpc.profile.getAllMyTopics.infiniteQueryOptions(QUERY_INPUT, QUERY_OPTION)
  )
  const likedTopicsQuery = useInfiniteQuery(
    trpc.profile.getLikedTopics.infiniteQueryOptions(QUERY_INPUT, QUERY_OPTION)
  )
  const bookmarkedTopicsQuery = useInfiniteQuery(
    trpc.profile.getBookmarkedTopics.infiniteQueryOptions(
      QUERY_INPUT,
      QUERY_OPTION
    )
  )
  const error =
    myTopicsQuery.error ?? likedTopicsQuery.error ?? bookmarkedTopicsQuery.error
  const isError =
    myTopicsQuery.isError ??
    likedTopicsQuery.isError ??
    bookmarkedTopicsQuery.isError

  if (isError && error) {
    return <ErrorComponent error={error} />
  }

  return (
    <section className="container pt-24">
      <ScrollToTopButton />
      <User.Root user={user}>
        <User.Avatar />
        <User.Content>
          <User.Displayname />
          {/* Create a route editProfile */}
          <div className="flex gap-3">
            <Button asChild size="lg" variant="outline">
              <Link to="/editProfile">
                <Pen />
                Edit profile
              </Link>
            </Button>
            <QuickEditProfile>
              <Button size="lg" variant="outline">
                <Ellipsis />
              </Button>
            </QuickEditProfile>
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
          <PaginationTopics.Root query={bookmarkedTopicsQuery}>
            <PaginationTopics.Empty>
              <Empty>
                <EmptyHeader>
                  <EmptyTitle>No topics booked yet</EmptyTitle>
                  <EmptyDescription>
                    Once you book a topic, it will appear here for easy access.
                    Start exploring and book the ones that interest you!
                  </EmptyDescription>
                </EmptyHeader>
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
        <ProfileTab.Content icon={<Heart />} value="Liked Topcis">
          <PaginationTopics.Root query={likedTopicsQuery}>
            <PaginationTopics.Empty>
              <Empty>
                <EmptyHeader>
                  <EmptyTitle>No topics liked yet</EmptyTitle>
                  <EmptyDescription>
                    Start exploring and tap the ❤️ on topics you enjoy. Your
                    favorites will show up here once you like them!
                  </EmptyDescription>
                </EmptyHeader>
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
      </ProfileTab.Root>
    </section>
  )
}
