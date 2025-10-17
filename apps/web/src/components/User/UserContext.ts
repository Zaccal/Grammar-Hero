import type { User } from '@/types/user.type'
import { createContext } from '@/hooks'

interface UserContext {
  user: User
}

export const userContext = createContext<UserContext>()
