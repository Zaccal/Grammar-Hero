import type { Context } from 'hono'
import path from 'path'
import { promises as fs } from 'fs'

export async function uploadImage(file: File, c: Context) {
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const uploadDir = path.join(process.cwd(), './src/images')

  await fs.mkdir(uploadDir, { recursive: true })

  const fileName = `${Date.now()}-${file.name}`
  const filePath = path.join(uploadDir, fileName)

  await fs.writeFile(filePath, buffer)

  return c.json({ url: `upload/images/${fileName}` }, 201)
}

export async function getImage(fileName: string) {
  const filePath = path.join(process.cwd(), './src/images', fileName)

  const buffer = await fs.readFile(filePath)

  return new Response(buffer, {
    headers: {
      'Content-Type': 'image/png',
    },
  })
}
