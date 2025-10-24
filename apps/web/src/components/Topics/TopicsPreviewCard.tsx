import { Bookmark } from '@/components/ui/bookmark'
import HeartLike from '@/components/ui/HeartLike'
import { cn } from '@/lib/utils'
import { getCuttedText, getServerImage, getVariantLevel } from '@/utils/index'
import { Badge } from '../ui/Badge'
import {
  MinimalCard,
  MinimalCardContent,
  MinimalCardDescription,
  MinimalCardFooter,
  MinimalCardTitle,
} from '../ui/SimpleCards'
import { topicsContext } from './TopicsContext'
import { TopicsImage } from './TopicsImage'

export function TopicsPreviewCard() {
  const state = topicsContext.useSelect(state => state)

  return (
    <>
      <MinimalCard className="h-full text-left">
        <TopicsImage
          alt={state.title}
          src={getServerImage(state.image)}
          className={cn(
            'relative h-[190px] w-full rounded-[20px] mb-6',
            'shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05),0px_1px_1px_0px_rgba(255,252,240,0.5)_inset,0px_0px_0px_1px_hsla(0,0%,100%,0.1)_inset,0px_0px_1px_0px_rgba(28,27,26,0.5)]',
            'dark:shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(0,0,0,0.1),0_2px_2px_0_rgba(0,0,0,0.1),0_4px_4px_0_rgba(0,0,0,0.1),0_8px_8px_0_rgba(0,0,0,0.1)]'
          )}
        />
        <MinimalCardContent>
          <MinimalCardTitle title={state.title}>
            {getCuttedText(state.title, 24)}
          </MinimalCardTitle>
          <MinimalCardDescription
            title={state.shortDescription}
            className="h-[48px]"
          >
            {getCuttedText(state.shortDescription, 58)}
          </MinimalCardDescription>
        </MinimalCardContent>

        <MinimalCardFooter className="flex justify-between">
          <Badge variant={getVariantLevel(state.level)}>{state.level}</Badge>
          <div className="flex items-center gap-3 text-muted-foreground text-sm">
            <div
              className={cn(
                'flex items-center gap-2',
                state.isLiked && 'text-destructive'
              )}
            >
              <HeartLike liked={state.isLiked} size={21} />
              <span>{state._count.likes}</span>
            </div>
            <div
              className={cn(
                'flex items-center gap-2',
                state.isBookmarked && 'text-yellow-300'
              )}
            >
              <Bookmark bookmarked={state.isBookmarked} />
              <span>{state._count.bookmark}</span>
            </div>
          </div>
        </MinimalCardFooter>
      </MinimalCard>
    </>
  )
}
