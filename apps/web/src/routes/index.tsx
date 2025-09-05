import {
  Greeting,
  GreetingDescription,
  GreetingTitle,
} from '@/components/Greeting/Greeting'
import { TopicsDialog } from '@/components/Topics/Topics'
import TopicsDialogCard from '@/components/Topics/TopicsDialogCard'
import { authClient } from '@/utils/auth-client'
import {
  createFileRoute,
  redirect,
  useLoaderData,
} from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { trpc } from '@/utils/trpc'
import Loader from '@/components/ui/loader'
import ErrorComponent from '@/components/ErrorComponent'

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
})

function HomeComponent() {
  const { user } = useLoaderData({ from: '/' })
  const {
    data: topics,
    isLoading,
    error,
    isError,
  } = useQuery(trpc.topics.getAll.queryOptions())

  if (isLoading) return <Loader />
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
        <TopicsDialog.List>
          {topics?.map(topicData => (
            <TopicsDialogCard key={topicData.id} topic={topicData} />
          ))}
        </TopicsDialog.List>
      </section>
    </>
  )
}
