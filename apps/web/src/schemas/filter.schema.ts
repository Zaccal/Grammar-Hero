import z from 'zod'

export const sortField = z.enum([
  'createdAt',
  'updatedAt',
  'title',
  'likes',
  'duration',
])
export const level = z
  .enum(['Advanced', 'Basic', 'Intermediate', 'All'])
  .optional()
export const sort = z.enum(['asc', 'desc'])

export type SortField = z.infer<typeof sortField>
export type Level = z.infer<typeof level>
export type Sort = z.infer<typeof sort>

export const filterFormSchema = z.object({
  sort,
  sortField,
  level,
  duration: z.string().optional(),
})

export type FilterFormSchema = z.infer<typeof filterFormSchema>

export const sortLabels: Record<
  FilterFormSchema['sortField'],
  Record<FilterFormSchema['sort'], string>
> = {
  createdAt: {
    asc: 'Oldest first',
    desc: 'Newset first',
  },
  updatedAt: {
    asc: 'Least recently updated',
    desc: 'Recently updated',
  },
  title: {
    asc: 'A -> Z',
    desc: 'Z -> A',
  },
  likes: {
    asc: 'Least liked',
    desc: 'Most liked',
  },
  duration: {
    asc: 'Shortest first',
    desc: 'Longest first',
  },
} as const
