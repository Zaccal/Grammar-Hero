import {
  Greeting,
  GreetingDescription,
  GreetingTitle,
} from '@/components/Greeting/Greeting'
import { authClient } from '@/lib/auth-client'
import {
  createFileRoute,
  redirect,
  useLoaderData,
} from '@tanstack/react-router'

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

  return (
    <section>
      <Greeting>
        <GreetingTitle>Welcome {user.displayUsername}!</GreetingTitle>
        <GreetingDescription>
          Choose a grammar topic and start learning right away! Here you’ll find
          a variety of grammar lessons designed to help you understand and use
          English correctly. Explore the topics, practice your skills, and
          improve your grammar with practical examples and explanations.
        </GreetingDescription>
      </Greeting>
    </section>
  )
}
