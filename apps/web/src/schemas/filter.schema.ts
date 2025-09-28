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

export const durationValues: Record<
  string,
  { min: string | undefined, max: string | undefined }
> = {
  'All': { min: '00:00:00', max: undefined },
  '5-10 min': { min: '00:05:00', max: '00:10:00' },
  '10-15 min': { min: '00:10:00', max: '00:15:00' },
  '15-20 min': { min: '00:15:00', max: '00:20:00' },
  '20-25 min': { min: '00:20:00', max: '00:25:00' },
  '25-30 min': { min: '00:25:00', max: '00:30:00' },
  '30-35 min': { min: '00:30:00', max: '00:35:00' },
  '35+ min': { min: '00:35:00', max: undefined },
}

export const durationOptions = Object.entries(durationValues).map(
  ([key]) => key
)
