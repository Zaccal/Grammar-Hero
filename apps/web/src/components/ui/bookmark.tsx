import { Bookmark as BookmarkIcon } from 'lucide-react'

interface BookmarkProps {
  bookmarked: boolean
}

export const Bookmark = ({ bookmarked }: BookmarkProps) => {
  return bookmarked ? (
    <BookmarkIcon size={21} fill="#ffdf20" color="#ffdf20" />
  ) : (
    <BookmarkIcon size={21} />
  )
}
