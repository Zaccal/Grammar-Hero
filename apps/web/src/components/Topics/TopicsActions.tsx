import { Link } from '@tanstack/react-router'
import { Bookmark } from 'lucide-react'
import { Button } from '../ui/button'
import { topicsContext } from './TopicsContext'

interface TopicsActionsProps {
  children?: React.ReactNode
}

export function TopicsActions({ children }: TopicsActionsProps) {
  const { id, _count } = topicsContext.useSelect(state => state)
  // ? for while I left the bookmark button non-functional and this component is just a layout
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
      <div className="space-x-3 ">
        {children}
        <Button variant="outline" aria-label="add to favorites">
          <Bookmark />
          <span>{_count.bookmark}</span>
        </Button>
      </div>
    </div>
  )
}
