import type { FilterParamsSchema } from '@server/schemas/filterParams.schema'
import { filterParamsSchema } from '@server/schemas/filterParams.schema'
import { useInfiniteQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import ErrorComponent from '@/components/ErrorComponent'
import { Filter } from '@/components/Filter/index'
import {
  Greeting,
  GreetingDescription,
  GreetingTitle,
} from '@/components/Greeting/Greeting'
import { PaginationTopics } from '@/components/PaginationTopics'
import ScrollToTopButton from '@/components/ScrollToTopButton/ScrollToTopButton'
import { TopicsDialog } from '@/components/Topics/index'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '@/components/ui/empty'
import { QUERY_OPTION } from '@/lib/constants'
import { trpc } from '@/lib/trpc'
import ensureSession from '@/middleware'
import { getReadTime, getServerImage } from '@/utils/index'

export const Route = createFileRoute('/')({
  component: HomeComponent,
  loader: ensureSession,
  validateSearch: (search: Partial<FilterParamsSchema>) =>
    filterParamsSchema.parse(search),
})

function HomeComponent() {
  const { user } = Route.useLoaderData()
  const searchParams = Route.useSearch()
  const topicsQuery = useInfiniteQuery(
    trpc.topics.getAll.infiniteQueryOptions(searchParams, QUERY_OPTION)
  )
  const topics = topicsQuery.data?.pages.flatMap(page => page.items)

  if (topicsQuery.isError) {
    return <ErrorComponent error={topicsQuery.error} />
  }

  return (
    <>
      <section>
        <Greeting>
          <GreetingTitle>Welcome {user.displayUsername}!</GreetingTitle>
          <GreetingDescription>
            Choose a grammar topic and start learning right away! Here you’ll
            find a variety of grammar lessons designed to help you understand
            and use English correctly. Explore the topics, practice your skills,
            and improve your grammar with practical examples and explanations.
          </GreetingDescription>
        </Greeting>
      </section>
      <section className="py-16">
        <Filter.Root route={Route.fullPath}>
          <Filter.Search />
          <Filter.Sheet>
            <Filter.Form className="h-full">
              <Filter.SheetBody className="mb-8">
                <div className="grid gap-5">
                  <Filter.Sort />
                  <Filter.Level />
                  <Filter.Duration />
                </div>
              </Filter.SheetBody>
              <Filter.SheetFooter>
                <Filter.Actions />
              </Filter.SheetFooter>
            </Filter.Form>
          </Filter.Sheet>
        </Filter.Root>
        <ScrollToTopButton />
        <PaginationTopics.Root query={topicsQuery}>
          <PaginationTopics.Empty>
            <Empty>
              <EmptyHeader>
                <EmptyTitle>No Topics Yet</EmptyTitle>
                <EmptyDescription>
                  It looks like there aren’t any topics here right now. Start by
                  creating a new one to get the discussion going!
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </PaginationTopics.Empty>
          <PaginationTopics.IntersectionObserver>
            <TopicsDialog.List>
              <PaginationTopics.Skeleton />
              {topics?.map(topic => (
                <TopicsDialog.Root key={topic.id} topic={topic}>
                  <TopicsDialog.Preview>
                    <TopicsDialog.PreviewCard />
                  </TopicsDialog.Preview>
                  <TopicsDialog.Content>
                    <TopicsDialog.Image
                      src={getServerImage(topic.image)}
                      alt={topic.title}
                      className="w-full max-h-[400px] h-full"
                    />
                    <div className="p-6">
                      <TopicsDialog.Title>{topic.title}</TopicsDialog.Title>
                      <TopicsDialog.Subtitle>
                        {getReadTime(topic.durationMin, topic.durationMax)}
                      </TopicsDialog.Subtitle>
                      <TopicsDialog.Description>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {topic.description}
                        </p>

                        <TopicsDialog.Actions>
                          <TopicsDialog.Like />
                          <TopicsDialog.Bookmark />
                        </TopicsDialog.Actions>
                      </TopicsDialog.Description>
                    </div>
                  </TopicsDialog.Content>
                </TopicsDialog.Root>
              ))}
            </TopicsDialog.List>
          </PaginationTopics.IntersectionObserver>
          <PaginationTopics.Loader />
        </PaginationTopics.Root>
      </section>
    </>
  )
}
