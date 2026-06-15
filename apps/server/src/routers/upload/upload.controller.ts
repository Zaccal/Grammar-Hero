import type { Context } from 'hono'
import type { ImageType } from '../../utils/imageUploadUtils'
import { TRPCError } from '@trpc/server'
import { r2Client } from '../../lib/r2Client'
import {
  getUploadObjectKey,
  getUploadPublicUrl,
  validateImageName,
} from '../../utils/imageUploadUtils'

export async function upload(
  file: File,
  id: string,
  type: ImageType,
  c: Context
) {
  validateImageName(file)
  const fileName = id
  const objectKey = getUploadObjectKey(fileName, type)

  try {
    await r2Client.write(objectKey, file, {
      type: file.type,
    })
  }
 catch (err) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to upload image',
      cause: err,
    })
  }
  return c.json({ url: getUploadPublicUrl(objectKey, fileName) }, 201)
}

export async function deleteImage(objectKey: string, c: Context) {
  try {
    await r2Client.delete(objectKey)
  }
 catch (err) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to delete image',
      cause: err,
    })
  }
  return c.json({ message: 'Image deleted successfully' }, 200)
}
