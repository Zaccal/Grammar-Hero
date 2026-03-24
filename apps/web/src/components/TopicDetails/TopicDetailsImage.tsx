import { getServerImage } from '@/utils/index'
import { TopicDetailsContext } from './TopicDetailsContext'

export function TopicDetailsImage() {
  const { image, title } = TopicDetailsContext.useSelect(state => state)
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
