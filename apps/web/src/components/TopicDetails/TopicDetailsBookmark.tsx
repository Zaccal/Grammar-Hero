import { Button } from '../ui/button'
import { Bookmark } from 'lucide-react'
import { topicDetailsContext } from './TopicDetails'

export const TopicDetailsBookmark = () => {
  const { bookmark } = topicDetailsContext.useSelect(state => state)
  return (
    <Button variant={'mutedGhost'}>
      <Bookmark size={21} />
      <span>{bookmark.length}</span>
    </Button>
  )
}
