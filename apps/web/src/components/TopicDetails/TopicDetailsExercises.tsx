import { Link } from '@tanstack/react-router'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { TopicDetailsContext } from './TopicDetailsContext'

export function TopicDetailsExercises() {
  const { id, exercises } = TopicDetailsContext.useSelect(state => state)

  if (exercises.length === 0) { return null }

  return (
    <>
     <p className="text-sm text-muted-foreground text-center mb-4 mt-12">
        Let's practice!
     </p>
      <div className="relative flex items-center justify-center w-full mb-6">
        <Separator className="absolute" />
        <div className="relative flex items-center gap-2 bg-background px-4">
          <Button asChild size="lg">
            <Link
              to="/topic/exercises/$id"
              params={{ id}}>
                Start exercises
            </Link>
          </Button>
        </div>
      </div>
    </>
  )
}
