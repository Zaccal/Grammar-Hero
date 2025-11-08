import type { Context } from 'hono'
import { describe, expect, it, vi } from 'vitest'
import { removeImage, uploadImage } from './upload.controller'

vi.mock('./upload.controller', () => ({
  uploadImage: vi.fn().mockResolvedValue({ url: 'test.jpg' }),
  removeImage: vi
    .fn()
    .mockImplementation(async (fileName: string, _userId: string) => {
      if (fileName === 'test.jpg') {
        return { ok: true, deleted: 'test.jpg', size: 100 }
      }
      throw new Error('Image not found')
    }),
}))

describe('upload', () => {
  it('should upload a file', async () => {
    const file = new File([''], 'test.jpg', { type: 'image/jpeg' })
    const upload = uploadImage(file, '123', {} as Context)

    await expect(upload).resolves.toEqual({ url: 'test.jpg' })
  })

  it('should remove a file', async () => {
    await expect(removeImage('test.jpg', '123')).resolves.toEqual({
      ok: true,
      deleted: 'test.jpg',
      size: 100,
    })
  })

  it('should throw an error if file is not found', async () => {
    await expect(removeImage('test1.jpg', '123')).rejects.toThrow(
      'Image not found'
    )
  })
})
