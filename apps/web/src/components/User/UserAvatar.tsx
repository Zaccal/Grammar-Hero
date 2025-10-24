import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { getServerImage, getUserImageFallbackText } from '@/utils'
import { userContext } from './UserContext'

interface UserAvatarProps {
  className?: string
  classNameFallback?: string
}

export function UserAvatar({ className, classNameFallback }: UserAvatarProps) {
  const { image, displayUsername, name } = userContext.useSelect(
    state => state.user
  )
  return (
    <>
      <Avatar className={cn('size-20', className)}>
        <AvatarImage src={getServerImage(image ?? '') ?? undefined} />
        <AvatarFallback className={cn('text-xl', classNameFallback)}>
          {getUserImageFallbackText(displayUsername ?? name)}
        </AvatarFallback>
      </Avatar>
    </>
  )
}
