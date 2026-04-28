import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import ErrorComponent from '@/components/ErrorComponent'
import { Exercises } from '@/components/Exercises'
import Loader from '@/components/ui/loader'
import { trpc } from '@/lib/trpc'
import ensureSession from '@/middleware'

export const Route = createFileRoute('/topic/exercises/$id')({
  component: RouteComponent,
  beforeLoad: ensureSession,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const {
    data: topic,
    isLoading,
    isError,
    error,
  } = useQuery(trpc.topics.getById.queryOptions(id))

  if (isLoading) {
    return <Loader />
  }
  if (isError) {
    return <ErrorComponent error={error} />
  }

  return (
    <div className="container py-12">
      <Exercises.Root topic={topic!}>
        <Exercises.Progress />
        <Exercises.Slider>
          {exerciseIndex => (
            <Exercises.Content
              key={exerciseIndex}
              currentExerciseIndex={exerciseIndex}
            >
              {(answer, index, exerciseId) => (
                <Exercises.Item
                  key={answer.id}
                  answer={answer}
                  index={index}
                  exerciseId={exerciseId}
                />
              )}
            </Exercises.Content>
          )}
        </Exercises.Slider>
        <div className="flex flex-col gap-4">
          <Exercises.Action fullWidth action="next" size="lg">
            Next
          </Exercises.Action>
          <Exercises.Action
            fullWidth
            action="prev"
            variant="outline"
            size="lg"
          >
            Previous
          </Exercises.Action>
        </div>
      </Exercises.Root>
    </div>
  )
}
