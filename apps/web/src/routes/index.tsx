import type { FilterParamsSchema } from '@server/schemas/filterParams.schema'
import { filterParamsSchema } from '@server/schemas/filterParams.schema'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute, redirect } from '@tanstack/react-router'
import ErrorComponent from '@/components/ErrorComponent'
import { Filter } from '@/components/Filter/index'
import {
  Greeting,
  GreetingDescription,
  GreetingTitle,
} from '@/components/Greeting/Greeting'
import { TopicsDialog } from '@/components/Topics/index'
import TopicsDialogCard from '@/components/Topics/monolite/TopicsDialogCard'
import { authClient } from '@/lib/auth-client'
import { trpc } from '@/lib/trpc'
import { getDummyArray } from '@/utils/getDummyArray'

export const Route = createFileRoute('/')({
  component: HomeComponent,
  loader: async () => {
    const { data, error } = await authClient.getSession()
    if (error || !data) {
      throw redirect({
        to: '/sign-up',
      })
    }
    return data
  },
  validateSearch: (search: Partial<FilterParamsSchema>) =>
    filterParamsSchema.parse(search),
})

function HomeComponent() {
  const { user } = Route.useLoaderData()
  const searchParams = Route.useSearch()
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
          <GreetingTitle>
            Welcome
            {user.displayUsername}
            !
          </GreetingTitle>
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
            ? getDummyArray(6).map(value => (
                <TopicsDialog.Skeleton key={value} />
              ))
            : topics?.map(topicData => (
                <TopicsDialogCard key={topicData.id} topic={topicData} />
              ))}
        </TopicsDialog.List>
      </section>
    </>
  )
}
