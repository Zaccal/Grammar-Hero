import { auth } from '@/lib/auth'
import type { Context, Next } from 'hono'

export async function authMiddleware(c: Context, next: Next) {
  const session = await auth.api.getSession({ headers: c.req.raw.headers })

  if (!session) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  c.set('session', session)

  await next()
}
