import z from 'zod'
import { UPLOAD_FILE_SIZE_MB } from '../routers/upload/constants'

const fileSchema = z
  .custom<File>()
  .refine(file => file instanceof File, 'Must be a file')
  .refine(file => file.type.startsWith('image/'), 'Only images allowed')
  .refine(
    file => file.size <= UPLOAD_FILE_SIZE_MB * 1024 * 1024,
    `Max file size is ${UPLOAD_FILE_SIZE_MB}MB`
  )

export const uploadSchema = z.object({
  file: fileSchema,
  type: z.enum(['avatar', 'preview']).default('avatar'),
  topicId: z.string().optional(),
})

export type UploadSchema = z.infer<typeof uploadSchema>
