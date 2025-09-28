import { Link } from '@tanstack/react-router'
import { Bookmark, Heart } from 'lucide-react'
import { Button } from '../ui/button'
import { topicsContext } from './TopicsContext'

export function TopicsActions() {
  const { id, likes, bookmark } = topicsContext.useSelect(state => state)
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
        <Button variant="muted" aria-label="like">
          <Heart />
          <span>{likes}</span>
        </Button>
        <Button variant="muted" aria-label="add to favorites">
          <Bookmark />
          <span>{bookmark.length}</span>
        </Button>
      </div>
    </div>
  )
}
