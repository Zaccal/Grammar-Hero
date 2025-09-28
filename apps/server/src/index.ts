import process from 'node:process'
import { trpcServer } from '@hono/trpc-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { auth } from './lib/auth'
import { createContext } from './lib/context'
import { appRouter } from './routers'
import { uploadRoute } from './routers/upload/upload.route'
import 'dotenv/config'

const app = new Hono()

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

app.on(['POST', 'GET'], 'api/auth/**', c => auth.handler(c.req.raw))

app.route('api/upload', uploadRoute)

app.use(
  '/trpc/**',
  trpcServer({
    router: appRouter,
    createContext: (_opts, context) => createContext({ context }),
  })
)

export default app
