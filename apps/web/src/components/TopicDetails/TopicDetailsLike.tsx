import { Button } from '../ui/button'
import { Heart } from 'lucide-react'
import { topicDetailsContext } from './TopicDetails'

export const TopicDetailsLike = () => {
  const { likes } = topicDetailsContext.useSelect(state => state)
  return (
    <Button variant={'mutedGhost'}>
      <Heart size={21} />
      <span>{likes}</span>
    </Button>
  )
}
