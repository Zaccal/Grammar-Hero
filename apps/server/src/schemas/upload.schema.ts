import z from 'zod'
import { UPLOAD_FILE_SIZE_MB } from '@/routers/upload/constants'

export const uploadSchema = z.object({
  file: z
    .custom<File>()
    .refine(file => file instanceof File, 'Must be a file')
    .refine(file => file.type.startsWith('image/'), 'Only images allowed')
    .refine(file => file.size <= UPLOAD_FILE_SIZE_MB * 1024 * 1024),
  exchangeFile: z.string().optional(),
})

export type UploadSchema = z.infer<typeof uploadSchema>
