import { userContext } from './UserContext'

export function UserDisplayname() {
  const displayUsername = userContext.useSelect(
    state => state.user.displayUsername
  )
  const name = userContext.useSelect(state => state.user.name)

  return <h1 className="text-2xl font-black">{displayUsername ?? name}</h1>
}
