import { PaginationTopics as Root } from './PaginationTopics'
import { PaginationTopicsEmpty } from './PaginationTopicsEmpty'
import { PaginationTopicsObserverIntersection } from './PaginationTopicsIntersectionObserver'
import { PaginationTopicsList } from './PaginationTopicsList'
import { PaginationTopicsLoader } from './PaginationTopicsLoader'
import { PaginationTopicsRender } from './PaginationTopicsRender'
import { PaginationTopicsShowMore } from './PaginationTopicsShowMore'
import { PaginationTopicsSkeletons } from './PaginationTopicsSkeletons'

export const PaginationTopics = {
  Root,
  Loader: PaginationTopicsLoader,
  ShowMore: PaginationTopicsShowMore,
  Skeleton: PaginationTopicsSkeletons,
  Render: PaginationTopicsRender,
  List: PaginationTopicsList,
  Empty: PaginationTopicsEmpty,
  IntersectionObserver: PaginationTopicsObserverIntersection,
}
