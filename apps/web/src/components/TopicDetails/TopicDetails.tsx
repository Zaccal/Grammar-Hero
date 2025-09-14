import { createContext } from '@/hooks'
import { Badge } from '../ui/Badge'
import { getVariantLevel } from '@/utils/getVariantLevel'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { getUserImageFallbackText } from '@/utils/getUserImageFallbackText'
import dateformat from 'dateformat'
import { Button } from '../ui/button'
import { Bookmark, Ellipsis, Heart } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import TopicDetailsContent from './TopicDetailsContent'
import type { Topic } from '@server/routers/topics/topics.types'
import { getReadTime } from '@/utils/getReadTime'

export const topicDetailsContext = createContext<Topic>()

interface TopicDetailsProps {
  topic: Topic
  children: React.ReactNode
  className?: string
}

export function TopicDetailsRoot({
  topic,
  children,
  className,
}: TopicDetailsProps) {
  return (
    <topicDetailsContext.Provider initialValue={topic}>
      <div className={className}>{children}</div>
    </topicDetailsContext.Provider>
  )
}
