import z from 'zod'

export const paginationShema = z.object({
  limit: z.number().min(1).max(50).default(15),
  cursor: z.string().optional(),
})

export type PaginationShema = z.infer<typeof paginationShema>
