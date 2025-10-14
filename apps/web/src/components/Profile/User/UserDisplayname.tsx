import { userContext } from './UserContext'

export function UserDisplayname() {
  const displayUsername = userContext.useSelect(
    state => state.user.displayUsername
  )

  return <h1 className="text-2xl font-black">{displayUsername}</h1>
}
