import { Button } from '@/components/ui/button'
import ensureSession from '@/middleware'
import { getCountOfCorrectAnswers } from '@/utils'
import {
  createFileRoute,
  useRouter,
  useRouterState,
} from '@tanstack/react-router'
import { notFound } from '@tanstack/router-core'

export const Route = createFileRoute('/topic/exercises/result')({
  component: RouteComponent,
  beforeLoad: ensureSession,
})

function RouteComponent() {
  const router = useRouter()
  const quizResults = useRouterState({
    select: s => s.location.state,
  }).quizResults

  if (!quizResults) {
    throw notFound()
  }
  const score = getCountOfCorrectAnswers(quizResults.selectedAnswers)
  const dinoStatus = getDinoStatus(score, quizResults.selectedAnswers.length)

  return (
    <div className="container mt-12">
      <img src={dinoStatus.image} alt="Dino" className="size-80 mx-auto" />
      <p className="mt-4 text-center">
        You scored {score} out of {quizResults.selectedAnswers.length}
      </p>
      <h1 className="mt-4 text-center text-4xl">{dinoStatus.title}</h1>
      <p className="mt-4 text-center text-xl text-muted-foreground">
        {dinoStatus.description}
      </p>

      <Button
        onClick={() =>
          router.navigate({
            to: '/topic/$id',
            params: {
              id: quizResults.topicId,
            },
          })
        }
        size={'lg'}
        className="mt-8 mx-auto block"
      >
        Go back
      </Button>
    </div>
  )
}

function getDinoStatus(countCorrect: number, total: number) {
  const percentage = (countCorrect / total) * 100

  if (percentage >= 90) {
    return {
      image: '/dino-happy.png',
      title: 'You are a dino!',
      description: 'You scored a high score. Keep up the good work!',
    }
  } else if (percentage >= 70) {
    return {
      image: '/dino-ok.png',
      title: 'You are doing well!',
      description: 'You scored a good score. Keep practicing!',
    }
  } else if (percentage >= 50) {
    return {
      image: '/dino-sad.png',
      title: 'You need to work harder!',
      description: 'You scored a low score. Keep practicing!',
    }
  } else {
    return {
      image: '/dino-sad.png',
      title: 'You need to work harder!',
      description: 'You scored a low score. Keep practicing!',
    }
  }
}
