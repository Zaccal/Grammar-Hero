import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getUserImageFallbackText } from '@/utils'
import { userContext } from './UserContext'

export function UserAvatar() {
  const { image, displayUsername, name } = userContext.useSelect(state => state.user)
  return (
    <>
      <Avatar className="size-20">
        <AvatarImage src={image ?? undefined} />
        <AvatarFallback className="text-xl">
          {getUserImageFallbackText(displayUsername ?? name)}
        </AvatarFallback>
      </Avatar>
    </>
  )
}
