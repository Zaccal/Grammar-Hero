export interface User {
  id: string
  email: string
  emailVerified: boolean
  name: string
  createdAt: Date
  updatedAt: Date
  image?: string | null | undefined
  username?: string | null | undefined
  displayUsername?: string | null | undefined
}
