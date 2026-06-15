import process from 'node:process'
import { TRPCError } from '@trpc/server'
import sanitize from 'sanitize-filename'
import { UPLOAD_PREFIX_AVATAR, UPLOAD_PREFIX_PREVIEW } from '../lib/constants'

export type ImageType = 'avatar' | 'preview'

export function validateImageName(file: File) {
  const name = file.name
  const type = file.type
  const validatedName = sanitize(name)
  if (!validatedName) {
    throw new TRPCError({ code: 'BAD_REQUEST', message: 'Invalid image name' })
  }

  if (!type.startsWith('image/')) {
    throw new TRPCError({ code: 'BAD_REQUEST', message: 'Invalid image type' })
  }

  return validatedName.trim()
}

export function getUploadObjectKey(
  fileName: string,
  type: ImageType = 'avatar'
) {
  return `${type === 'preview' ? UPLOAD_PREFIX_PREVIEW : UPLOAD_PREFIX_AVATAR}/${fileName}`
}

export function getUploadPublicUrl(objectKey: string, _fileName: string) {
  return `${process.env.R2_PUBLIC_URL}/${objectKey}`
}
