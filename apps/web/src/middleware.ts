import { redirect } from '@tanstack/react-router'
import Cookies from 'js-cookie'
import { authClient } from './lib/auth-client'

// Middleware to protect routes that require authentication, but do not need user data, like /createTopic
// by that it will not requeset on server the user data on each request
export async function protectedMiddleware() {
  const token = Cookies.get(import.meta.env.VITE_AUTH_COOKIE_NAME ?? '')

  if (!token) {
    throw redirect({
      to: '/sign-up',
    })
  }
}

export async function ensureSession() {
  const { data, error } = await authClient.getSession()

  if (error || !data?.user) {
    throw redirect({
      to: '/sign-up',
    })
  }

  return data
}
