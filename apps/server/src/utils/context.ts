import type { Context as HonoContext } from 'hono'
import { auth } from '../utils/auth'

export type CreateCotextOptions = {
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
