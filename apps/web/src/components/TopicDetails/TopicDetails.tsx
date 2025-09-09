import { createContext } from '@/hooks'
import { Badge } from '../ui/Badge'
import { getVariantLevel } from '@/lib/getVariantLevel'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { getUserImageFallbackText } from '@/lib/getUserImageFallbackText'
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
import { getReadTime } from '@/lib/getReadTime'

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

export function TopicDetailsHeader() {
  const { title, level, createdAt, duration, user } =
    topicDetailsContext.useSelect(state => state)

  return (
    <>
      <Badge className="mb-2 md:mb-4" variant={getVariantLevel(level)}>
        {level}
      </Badge>
      <h1 className="text-2xl md:text-4xl font-black pb-6">{title}</h1>
      <div className="flex items-center gap-2 md:gap-3 text-muted-foreground">
        <div className="flex items-center gap-2">
          <Avatar className="size-7 md:size-8">
            <AvatarImage
              src={user.image ?? undefined}
              alt={`User avatar: ${user.displayUsername}`}
            />
            <AvatarFallback>
              {getUserImageFallbackText(user.displayUsername ?? user.name)}
            </AvatarFallback>
          </Avatar>
          <span className="topic-details-text">{user.displayUsername}</span>
        </div>
        <div className="dot"></div>
        <span className="topic-details-text">{getReadTime(duration)}</span>
        <div className="dot"></div>
        <span className="topic-details-text">
          {dateformat(createdAt, 'mmm d, yyyy')}
        </span>
      </div>
    </>
  )
}

export function TopicDetailsActions() {
  const { likes, bookmark } = topicDetailsContext.useSelect(state => state)
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-x-3">
          <Button variant={'mutedGhost'}>
            <Heart size={21} />
            <span>{likes}</span>
          </Button>
          <Button variant={'mutedGhost'}>
            <Bookmark size={21} />
            <span>{bookmark.length}</span>
          </Button>
        </div>
        <TopicDetailsDropdown />
      </div>
    </>
  )
}

export function TopicDetailsDropdown() {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size={'icon'} variant={'ghost'}>
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <TopicDetailsDropdownContentProtected />
          <TopicDetailsDropdownContentPublic />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export function TopicDetailsDropdownContentProtected() {
  return (
    <>
      <DropdownMenuLabel>Special options</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
      </DropdownMenuGroup>
    </>
  )
}

export function TopicDetailsDropdownContentPublic() {
  return (
    <>
      <DropdownMenuSeparator />
      <DropdownMenuLabel>Options</DropdownMenuLabel>
      <DropdownMenuGroup>
        <DropdownMenuItem>Report</DropdownMenuItem>
        <DropdownMenuItem>Share</DropdownMenuItem>
        <DropdownMenuItem>Copy link</DropdownMenuItem>
        <DropdownMenuItem>Add to favorites</DropdownMenuItem>
      </DropdownMenuGroup>
    </>
  )
}

export function TopicDetailsImage() {
  const { image, title } = topicDetailsContext.useSelect(state => state)
  if (!image) return null
  return (
    <>
      <img
        className="mt-12 mx-auto w-full rounded-lg border-6 border-transparent outline-4 outline-border"
        src={image}
        alt={title}
      />
    </>
  )
}

export const TopicDetails = {
  Root: TopicDetailsRoot,
  Header: TopicDetailsHeader,
  Actions: TopicDetailsActions,
  Dropdown: TopicDetailsDropdown,
  Image: TopicDetailsImage,
  Content: TopicDetailsContent,
}
