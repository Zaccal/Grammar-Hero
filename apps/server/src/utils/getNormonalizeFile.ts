import path from 'node:path'
import { TRPCError } from '@trpc/server'
import sanitize from 'sanitize-filename'
import { getIsFileAllowedType } from './getIsFileAllowedType'
import { getIsInsideBase } from './getIsInsideBase'

export function getNormonalizeFile(file: File | string, IMAGES_PATH: string) {
  const validFileName = sanitize(file instanceof File ? file.name.trim() : file)

  if (!validFileName) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Invalid filename',
    })
  }

  if (!getIsFileAllowedType(validFileName)) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Invalid file type',
    })
  }

  if (!getIsFileAllowedType(validFileName)) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Invalid file type',
    })
  }

  const abs = path.resolve(IMAGES_PATH, validFileName)
  if (!getIsInsideBase(IMAGES_PATH, abs)) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Filename escapes images directory',
    })
  }

  return validFileName
}
