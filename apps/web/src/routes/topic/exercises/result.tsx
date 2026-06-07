import {
  createFileRoute,
  useRouter,
  useRouterState,
} from '@tanstack/react-router'
import { notFound } from '@tanstack/router-core'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import ensureSession from '@/middleware'
import { cn } from '@/lib/utils'
import type { SelectedAnswer } from '@/types/result.type'

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
  const resultRows = getResultRows(quizResults.selectedAnswers)
  const score = resultRows.filter(row => row.isCorrect).length
  const total = resultRows.length
  const dinoStatus = getDinoStatus(score, total)

  return (
    <div className="container mt-12 pb-12">
      <img src={dinoStatus.image} alt="Dino" className="size-80 mx-auto" />
      <p className="mt-4 text-center">
        You scored {score} out of {total}
      </p>
      <h1 className="mt-4 text-center text-4xl">{dinoStatus.title}</h1>
      <p className="mt-4 text-center text-xl text-muted-foreground">
        {dinoStatus.description}
      </p>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">Answer results</h2>
        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>Question</TableHead>
              <TableHead>Your answer</TableHead>
              <TableHead>Correct answer</TableHead>
              <TableHead className="text-right">Result</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {resultRows.map((row, index) => (
              <TableRow key={row.exerciseId}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="max-w-80 whitespace-normal font-medium">
                  {row.question}
                </TableCell>
                <TableCell className="max-w-72 whitespace-normal">
                  {row.selectedAnswers}
                </TableCell>
                <TableCell className="max-w-72 whitespace-normal">
                  {row.correctAnswers}
                </TableCell>
                <TableCell
                  className={cn(
                    'text-right font-medium',
                    row.isCorrect ? 'text-green-600' : 'text-destructive'
                  )}
                >
                  {row.isCorrect ? 'Correct' : 'Incorrect'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Final score</TableCell>
              <TableCell className="text-right">
                {score}/{total}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </section>

      <Button
        onClick={() =>
          router.navigate({
            to: '/topic/$id',
            params: {
              id: quizResults.topicId,
            },
          })
        }
        size="lg"
        className="mt-8 mx-auto block"
      >
        Go back
      </Button>
    </div>
  )
}

function getResultRows(selectedAnswers: SelectedAnswer[]) {
  const results = new Map<
    string,
    {
      exerciseId: string
      question: string
      selectedAnswers: string
      correctAnswers: string
      isCorrect: boolean
    }
  >()

  const selectedByExercise = new Map<string, SelectedAnswer[]>()

  for (const selectedAnswer of selectedAnswers) {
    const exerciseId = selectedAnswer.exercise.id
    const answers = selectedByExercise.get(exerciseId) ?? []

    selectedByExercise.set(exerciseId, [...answers, selectedAnswer])
  }

  for (const [exerciseId, answers] of selectedByExercise) {
    const exercise = answers[0]!.exercise
    const selectedAnswerTexts = answers.map(({ answer }) => answer.text)
    const selectedAnswerIds = answers.map(({ answer }) => answer.id).sort()
    const correctAnswers = exercise.answers.filter(answer => answer.isCorrect)
    const correctAnswerIds = correctAnswers.map(answer => answer.id).sort()

    results.set(exerciseId, {
      exerciseId,
      question: exercise.question,
      selectedAnswers: selectedAnswerTexts.join(', '),
      correctAnswers: correctAnswers.map(answer => answer.text).join(', '),
      isCorrect: arraysEqual(selectedAnswerIds, correctAnswerIds),
    })
  }

  return Array.from(results.values())
}

function arraysEqual(a: string[], b: string[]) {
  return a.length === b.length && a.every((value, index) => value === b[index])
}

function getDinoStatus(countCorrect: number, total: number) {
  const percentage = (countCorrect / total) * 100

  if (percentage >= 90) {
    return {
      image: '/dino-happy.webp',
      title: 'You are a dino!',
      description: 'You scored a high score. Keep up the good work!',
    }
  } else if (percentage >= 70) {
    return {
      image: '/dino-ok.webp',
      title: 'You are doing well!',
      description: 'You scored a good score. Keep practicing!',
    }
  } else if (percentage >= 50) {
    return {
      image: '/dino-sad.webp',
      title: 'You need to work harder!',
      description: 'You scored a low score. Keep practicing!',
    }
  } else {
    return {
      image: '/dino-sad.webp',
      title: 'You need to work harder!',
      description: 'You scored a low score. Keep practicing!',
    }
  }
}
