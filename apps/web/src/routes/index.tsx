import type { FilterParamsSchema } from '@server/schemas/filterParams.schema'
import { filterParamsSchema } from '@server/schemas/filterParams.schema'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import ErrorComponent from '@/components/ErrorComponent'
import { Filter } from '@/components/Filter/index'
import {
  Greeting,
  GreetingDescription,
  GreetingTitle,
} from '@/components/Greeting/Greeting'
import { TopicsDialog } from '@/components/Topics/index'
import { trpc } from '@/lib/trpc'
import ensureSession from '@/middleware'
import { getDummyArray, getReadTime, getServerImage } from '@/utils/index'

export const Route = createFileRoute('/')({
  component: HomeComponent,
  loader: ensureSession,
  validateSearch: (search: Partial<FilterParamsSchema>) =>
    filterParamsSchema.parse(search),
})

function HomeComponent() {
  const { user } = Route.useLoaderData()
  const searchParams = Route.useSearch()
  // TODO: I have to made a pagination
  const {
    data: topics,
    isLoading,
    error,
    isError,
  } = useQuery(trpc.topics.getAll.queryOptions(searchParams))

  if (isError)
return <ErrorComponent error={error} />

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
        <TopicsDialog.List>
          {isLoading
            ? getDummyArray(20).map(value => (
                <TopicsDialog.Skeleton key={value} />
              ))
            : topics?.map(topic => (
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
      </section>
    </>
  )
}
