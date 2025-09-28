import { redirect } from '@tanstack/react-router'
import { authClient } from './lib/auth-client'

export default async function ensureSession() {
  const { data, error } = await authClient.getSession()

  if (error || !data?.user) {
    throw redirect({
      to: '/sign-up',
    })
  }

  return data
}
