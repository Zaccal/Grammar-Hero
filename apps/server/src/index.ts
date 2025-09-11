import 'dotenv/config'
import { auth } from './lib/auth'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { trpcServer } from '@hono/trpc-server'
import { appRouter } from './routers'
import { createContext } from './lib/context'

const app = new Hono().basePath('/api')

app.use(logger())
app.use(
  '/*',
  cors({
    origin: process.env.CORS_ORIGIN || '',
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
)

app.on(['POST', 'GET'], '/auth/**', c => auth.handler(c.req.raw))

app.use(
  '/*',
  trpcServer({
    router: appRouter,
    createContext: (_opts, context) => createContext({ context }),
  })
)

export default app
