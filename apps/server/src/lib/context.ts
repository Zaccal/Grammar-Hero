import type { Context as HonoContext } from 'hono'
import { auth } from './auth'

export interface CreateCotextOptions {
  context: HonoContext
}

export async function createContext({ context }: CreateCotextOptions) {
  const headers = context.req.raw.headers
  const session = await auth.api.getSession({
    headers,
  })
  return {
    session,
    headers,
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>
