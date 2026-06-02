import { useInfiniteQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Bookmark,
  BriefcaseBusiness,
  Ellipsis,
  Heart,
  Lock,
  Mail,
  Menu,
  Pen,
  Trash,
} from 'lucide-react'
import { DeleteAccount } from '@/components/DeleteAccount'
import { PaginationTopics } from '@/components/PaginationTopics'
import { ProfileTab } from '@/components/ProfileTabs/index'
import ScrollToTopButton from '@/components/ScrollToTopButton/ScrollToTopButton'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
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
    throw new Error(`Profile query error: ${error?.message}`)
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
            <DeleteAccount.Root>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="lg" variant="outline">
                    <Ellipsis />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="sm:max-w-md">
                  <Link to="/change-email">
                    <DropdownMenuItem>
                      <Mail /> Change email
                    </DropdownMenuItem>
                  </Link>
                  <Link to="/change-password">
                    <DropdownMenuItem>
                      <Lock /> Change password
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DeleteAccount.Trigger>
                    <DropdownMenuItem variant="destructive">
                      <Trash /> Delete account
                    </DropdownMenuItem>
                  </DeleteAccount.Trigger>
                </DropdownMenuContent>
              </DropdownMenu>
            </DeleteAccount.Root>
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
