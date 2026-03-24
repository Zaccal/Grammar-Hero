import { MinimalCard, MinimalCardContent } from '../ui/SimpleCards'
import { Skeleton } from '../ui/skeleton'

export function TopicSkeleton() {
  return (
    <MinimalCard>
      <Skeleton className="rounded-sm w-full h-[190px]" />
      <MinimalCardContent>
        <Skeleton className="my-3 rounded-sm w-full h-6" />
        <div className="space-y-2">
          <Skeleton className="rounded-sm w-full h-2" />
          <Skeleton className="rounded-sm w-full h-2" />
          <Skeleton className="rounded-sm w-[50%] h-2" />
        </div>
      </MinimalCardContent>
    </MinimalCard>
  )
}
