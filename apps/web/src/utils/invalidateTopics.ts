import type { FilterParamsSchema } from '@server/schemas/filterParams.schema'
import { queryClient, trpc } from '@/lib/trpc'

export async function invalidateTopics(
  searchParams: FilterParamsSchema,
  id: string
) {
  const allTopics = queryClient.invalidateQueries({
    queryKey: trpc.topics.getAll.queryKey(searchParams),
  })
  const idTopic = queryClient.invalidateQueries({
    queryKey: trpc.topics.getById.queryKey(id),
  })

  await Promise.all([allTopics, idTopic])
}
