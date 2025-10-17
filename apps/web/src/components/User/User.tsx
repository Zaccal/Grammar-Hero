import type { User as UserType } from '@/types/user.type'
import { userContext } from './UserContext'

interface UserProps {
  user: UserType
  children: React.ReactNode | React.ReactNode[]
}

export function User({ user, children }: UserProps) {
  return (
    <userContext.Provider initialValue={{ user }}>
      <div className="flex items-center xs:mx-auto w-fit gap-6">{children}</div>
    </userContext.Provider>
  )
}
