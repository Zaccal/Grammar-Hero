import { Link } from '@tanstack/react-router'
import { Button } from '../ui/button'
import { topicsContext } from './TopicsContext'

interface TopicsActionsProps {
  children?: React.ReactNode
}

export function TopicsActions({ children }: TopicsActionsProps) {
  const id = topicsContext.useSelect(state => state.id)
  return (
    <div className="mt-8 flex justify-between items-center">
      <Button asChild size="lg">
        <Link
          to="/topic/$id"
          params={{
            id,
          }}
        >
          Start learning
        </Link>
      </Button>
      <div className="space-x-3 ">{children}</div>
    </div>
  )
}
