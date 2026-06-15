import { Buffer } from 'node:buffer'
import process from 'node:process'
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'

interface WriteOptions {
  type?: string
}

const s3Client = new S3Client({
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY ?? '',
    secretAccessKey: process.env.R2_SECRET_KEY ?? '',
  },
  endpoint: process.env.R2_ENDPOINT,
  forcePathStyle: true,
  region: process.env.R2_REGION ?? 'auto',
})

export const r2Client = {
  async write(key: string, file: File, options?: WriteOptions) {
    await s3Client.send(
      new PutObjectCommand({
        Body: Buffer.from(await file.arrayBuffer()),
        Bucket: process.env.R2_BUCKET,
        ContentType: options?.type || file.type || 'application/octet-stream',
        Key: key,
      })
    )
  },

  async delete(key: string) {
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: process.env.R2_BUCKET,
        Key: key,
      })
    )
  },
}
