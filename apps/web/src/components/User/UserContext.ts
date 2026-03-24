import type { User } from '@/types/user.type'
import { createContext } from '@/hooks'

interface UserContextProps {
  user: User
}

export const UserContext = createContext<UserContextProps>()
