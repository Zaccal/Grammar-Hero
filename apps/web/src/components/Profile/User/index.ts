import { User as Root } from './User'
import { UserAvatar } from './UserAvatar'
import { userContext } from './UserContext'
import { UserDetails } from './UserDetails'

export const User = {
  Root,
  Avatar: UserAvatar,
  Context: userContext,
  Details: UserDetails
}
