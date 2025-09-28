import { Bookmark } from 'lucide-react'
import { Button } from '../ui/button'
import { topicDetailsContext } from './TopicDetailsContext'

export function TopicDetailsBookmark() {
  const { bookmark } = topicDetailsContext.useSelect(state => state)
  return (
    <Button variant="mutedGhost">
      <Bookmark size={21} />
      <span>{bookmark.length}</span>
    </Button>
  )
}
