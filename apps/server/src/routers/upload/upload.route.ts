import type { BetterAuthVariables } from '@/lib/auth'
import { authMiddleware } from '@/middlewares/auth.middleware'
import { uploadSchema } from '@/schemas/upload.schema'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { serveStatic } from 'hono/serve-static'
import { getImage, uploadImage } from './upload.controller'

export const uploadRoute = new Hono<BetterAuthVariables>()

uploadRoute.use('/*', authMiddleware)

uploadRoute.post('/', zValidator('form', uploadSchema), async c => {
  const { file } = c.req.valid('form')

  return uploadImage(file, c)
})

uploadRoute.get(
  '/images/:fileName',
  serveStatic({
    root: './src/images',
    getContent: async (_, c) => {
      const fileName = c.req.param('fileName')
      return getImage(fileName)
    },
  })
)
