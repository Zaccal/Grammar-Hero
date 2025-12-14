import type { Context } from 'hono'
import { Buffer } from 'node:buffer'
import { promises as fs } from 'node:fs'
import { mkdir, stat, unlink } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { TRPCError } from '@trpc/server'
import { getNormonalizeFile } from '@/utils/getNormonalizeFile'

export const IMAGES_PATH = path.join(process.cwd(), './src/images')

export async function uploadImage(
  file: File,
  userId: string,
  c: Context,
  exchangeFile?: string
) {
  const validFileName = getNormonalizeFile(file, IMAGES_PATH)

  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  await fs.mkdir(IMAGES_PATH, { recursive: true })

  const fileName = `${userId}-${validFileName.trim()}`
  const filePath = path.join(IMAGES_PATH, fileName)

  if (exchangeFile) {
    await removeImage(exchangeFile, userId)
  }

  await fs.writeFile(filePath, buffer)

  return c.json({ url: `upload/images/${fileName}` }, 201)
}

export async function getImage(fileName: string) {
  const filePath = path.join(process.cwd(), './src/images', fileName)

  const buffer = await fs.readFile(filePath)

  return new Response(new Uint8Array(buffer), {
    headers: {
      'Content-Type': 'image/png',
    },
  })
}

export async function removeImage(fileName: string, userId: string) {
  const validFileName = getNormonalizeFile(fileName, IMAGES_PATH)

  if (validFileName.split('-')[0] !== userId) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Invalid file name',
    })
  }

  await mkdir(IMAGES_PATH, {
    recursive: true,
  })

  let size = 0
  try {
    const info = await stat(path.join(IMAGES_PATH, validFileName))
    if (!info.isFile()) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Target is not a file',
      })
    }
    size = info.size
  }
 catch (err: any) {
    if (err?.code === 'ENOENT') {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Image not found' })
    }
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to read image',
      cause: err,
    })
  }

  try {
    await unlink(path.join(IMAGES_PATH, validFileName))
  }
 catch (err) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to delete image',
      cause: err,
    })
  }

  return { ok: true, deleted: validFileName, size }
}
