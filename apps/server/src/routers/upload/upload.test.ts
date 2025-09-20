import { describe, expect, it, vi } from 'vitest'
import { uploadImage } from './upload.controller'
import type { Context } from 'hono'

vi.mock('./upload.controller', () => ({
  uploadImage: vi.fn().mockResolvedValue({ url: 'test.jpg' }),
}))

describe('upload', () => {
  it('should upload a file', async () => {
    const file = new File([''], 'test.jpg', { type: 'image/jpeg' })
    const upload = uploadImage(file, {} as Context)

    await expect(upload).resolves.toEqual({ url: 'test.jpg' })
  })
})
