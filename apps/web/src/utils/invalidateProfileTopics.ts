import { QUERY_INPUT, QUERY_OPTION } from '@/lib/constants'
import { queryClient, trpc } from '@/lib/trpc'

export async function invalidateProfileTopics() {
  const myTopics = queryClient.invalidateQueries(
    trpc.profile.getAllMyTopics.infiniteQueryOptions(QUERY_INPUT, QUERY_OPTION)
  )

  const bookmarkedTopics = queryClient.invalidateQueries(
    trpc.profile.getBookmarkedTopics.infiniteQueryOptions(
      QUERY_INPUT,
      QUERY_OPTION
    )
  )

  const likedTopics = queryClient.invalidateQueries(
    trpc.profile.getLikedTopics.infiniteQueryOptions(QUERY_INPUT, QUERY_OPTION)
  )

  await Promise.all([myTopics, bookmarkedTopics, likedTopics])
}
