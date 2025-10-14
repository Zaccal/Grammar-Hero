import { User as Root } from './User'
import { UserAvatar } from './UserAvatar'
import { UserContent } from './UserContent'
import { userContext } from './UserContext'
import { UserDisplayname } from './UserDisplayname'

export const User = {
  Root,
  Avatar: UserAvatar,
  Context: userContext,
  Content: UserContent,
  Displayname: UserDisplayname,
}
