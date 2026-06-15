import type { Context } from 'hono'
import process from 'node:process'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { r2Client } from '../../lib/r2Client'
import { upload } from './upload.controller'

vi.mock('../../lib/r2Client', () => ({
  r2Client: {
    write: vi.fn(),
  },
}))

const r2PublicUrl = process.env.R2_PUBLIC_URL

describe('upload', () => {
  afterEach(() => {
    vi.clearAllMocks()
    process.env.R2_PUBLIC_URL = r2PublicUrl
  })

  it('uploads a preview image to R2', async () => {
    process.env.R2_PUBLIC_URL = 'https://cdn.example.com'

    const file = new File(['image'], 'test.jpg', { type: 'image/jpeg' })
    const context = {
      json: vi.fn((body, status) => ({ body, status })),
    } as unknown as Context

    await expect(upload(file, 'topic-1', 'preview', context)).resolves.toEqual({
      body: { url: 'https://cdn.example.com/previews/topic-1' },
      status: 201,
    })

    expect(r2Client.write).toHaveBeenCalledWith('previews/topic-1', file, {
      type: 'image/jpeg',
    })
  })
})
