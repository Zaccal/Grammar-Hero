import { userContext } from './UserContext'

interface UserDetailsProps {
  children: React.ReactNode | React.ReactNode[]
}

export function UserDetails({ children }: UserDetailsProps) {
  const { displayUsername } = userContext.useSelect(state => state.user)
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-black">{displayUsername}</h1>
      {children}
    </div>
  )
}
