import type { Context as HonoContext } from 'hono'
import { auth } from './auth'

export interface CreateCotextOptions {
  context: HonoContext
}

export async function createContext({ context }: CreateCotextOptions) {
  const session = await auth.api.getSession({
    headers: context.req.raw.headers,
  })
  return {
    session,
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>
