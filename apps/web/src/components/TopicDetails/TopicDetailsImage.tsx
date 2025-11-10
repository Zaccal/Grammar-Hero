import { getServerImage } from '@/utils/index'
import { topicDetailsContext } from './TopicDetailsContext'

export function TopicDetailsImage() {
  const { image, title } = topicDetailsContext.useSelect(state => state)
  if (!image) {
    return null
  }
  return (
    <>
      <img
        className="mt-12 mx-auto w-full rounded-lg border-6 border-transparent outline-4 outline-border"
        src={getServerImage(image)}
        alt={title}
      />
    </>
  )
}
