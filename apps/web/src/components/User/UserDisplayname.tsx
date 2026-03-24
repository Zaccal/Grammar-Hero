import { UserContext } from './UserContext'

export function UserDisplayname() {
  const displayUsername = UserContext.useSelect(
    state => state.user.displayUsername
  )
  const name = UserContext.useSelect(state => state.user.name)

  return <h1 className="text-2xl font-black">{displayUsername ?? name}</h1>
}
