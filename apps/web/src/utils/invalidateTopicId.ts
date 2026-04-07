import { queryClient, trpc } from '@/lib/trpc'

export function invalidateTopicId(topicId: string) {
  return queryClient.invalidateQueries({
    queryKey: trpc.topics.getById.queryKey(topicId),
  })
}
