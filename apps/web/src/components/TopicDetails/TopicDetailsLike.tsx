import { Heart } from 'lucide-react'
import { Button } from '../ui/button'
import { topicDetailsContext } from './TopicDetailsContext'

export function TopicDetailsLike() {
  const { likes } = topicDetailsContext.useSelect(state => state)
  return (
    <Button variant="mutedGhost">
      <Heart size={21} />
      <span>{likes}</span>
    </Button>
  )
}
