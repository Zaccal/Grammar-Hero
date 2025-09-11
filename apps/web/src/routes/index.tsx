import {
  Greeting,
  GreetingDescription,
  GreetingTitle,
} from '@/components/Greeting/Greeting'
import TopicsDialogCard from '@/components/Topics/monolite/TopicsDialogCard'
import { TopicsDialog } from '@/components/Topics/index'
import { authClient } from '@/utils/auth-client'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { trpc } from '@/utils/trpc'
import ErrorComponent from '@/components/ErrorComponent'
import { Filter } from '@/components/Filter/index'
import {
  type FilterParamsSchema,
  filterParamsSchema,
} from '@server/schemas/filterParams.schema'

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

  if (isError) return <ErrorComponent error={error} />

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
              <div className="flex flex-col h-full justify-between gap-5">
                <Filter.SheetBody>
                  <div className="grid gap-5">
                    <Filter.Sort />
                    <Filter.Level />
                  </div>
                </Filter.SheetBody>
                <Filter.SheetFooter>
                  <Filter.Actions />
                </Filter.SheetFooter>
              </div>
            </Filter.Form>
          </Filter.Sheet>
        </Filter.Root>
        <TopicsDialog.List>
          {isLoading
            ? new Array(16)
                .fill(0)
                .map((_, index) => <TopicsDialog.Skeleton key={index} />)
            : topics?.map(topicData => (
                <TopicsDialogCard key={topicData.id} topic={topicData} />
              ))}
        </TopicsDialog.List>
      </section>
    </>
  )
}
