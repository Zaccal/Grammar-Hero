import dateformat from 'dateformat'
import {
  getReadTime,
  getServerImage,
  getUserImageFallbackText,
  getVariantLevel,
} from '@/utils/index'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/Badge'
import { topicDetailsContext } from './TopicDetailsContext'

export function TopicDetailsHeader() {
  const { title, level, createdAt, user, durationMin, durationMax } =
    topicDetailsContext.useSelect(state => state)

  return (
    <>
      <Badge className="mb-2 md:mb-4" variant={getVariantLevel(level)}>
        {level}
      </Badge>
      <h1 className="text-2xl md:text-4xl font-black pb-6">{title}</h1>
      <div className="xs:flex-row flex-col-reverse flex xs:items-center gap-4 md:gap-3 text-muted-foreground">
        <div className="flex items-center gap-2">
          <Avatar className="size-7 md:size-8">
            <AvatarImage
              src={getServerImage(user.image) ?? undefined}
              alt={`User avatar: ${user.displayUsername}`}
            />
            <AvatarFallback>
              {getUserImageFallbackText(user.displayUsername ?? user.name)}
            </AvatarFallback>
          </Avatar>
          <span className="topic-details-text">{user.displayUsername}</span>
        </div>

        <div className="flex items-center gap-2 md:gap-3 text-muted-foreground">
          <div className="dot xs:block hidden"></div>
          <span className="topic-details-text">
            {getReadTime(durationMin, durationMax)}
          </span>
          <div className="dot"></div>
          <span className="topic-details-text">
            {dateformat(createdAt, 'mmm d, yyyy')}
          </span>
        </div>
      </div>
    </>
  )
}
