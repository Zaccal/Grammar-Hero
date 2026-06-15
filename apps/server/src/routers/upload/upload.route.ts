import type { BetterAuthVariables } from '@/lib/auth'
import { zValidator } from '@hono/zod-validator'
import { TRPCError } from '@trpc/server'
import { Hono } from 'hono'
import { authMiddleware } from '@/middlewares/auth.middleware'
import { uploadSchema } from '@/schemas/upload.schema'
import { upload } from './upload.controller'

export const uploadRoute = new Hono<BetterAuthVariables>()

uploadRoute.use('/*', authMiddleware)

uploadRoute.post('/', zValidator('form', uploadSchema), async c => {
  const { file, type, topicId } = c.req.valid('form')
  const user = c.get('user')

  if (type === 'avatar' && user) {
    return upload(file, user.id, 'avatar', c)
  }

  if (topicId) {
    return upload(file, topicId, type, c)
  }

  throw new TRPCError({
    code: 'BAD_REQUEST',
    message: 'topicId is required for preview',
  })
})
