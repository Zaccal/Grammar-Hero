import {
  MinimalCard,
  MinimalCardContent,
  MinimalCardDescription,
  MinimalCardFooter,
  MinimalCardTitle,
} from '../../ui/SimpleCards'
import { topicsContext } from '../Topics'
import { cn } from '@/lib/utils'
import { Badge } from '../../ui/Badge'
import { Heart, Bookmark } from 'lucide-react'
import { getVariantLevel } from '@/utils/getVariantLevel'
import { TopicsImage } from '../TopicsImage'
import { getCuttedText } from '@/utils/getCuttedText'

export function TopicsCard() {
  const { title, image, shortDescription, level, likes, bookmark } =
    topicsContext.useSelect(state => state)
  return (
    <>
      <MinimalCard className="h-full text-left">
        <TopicsImage
          alt={title}
          src={image}
          className={cn(
            'relative h-[190px] w-full rounded-[20px] mb-6',
            'shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05),0px_1px_1px_0px_rgba(255,252,240,0.5)_inset,0px_0px_0px_1px_hsla(0,0%,100%,0.1)_inset,0px_0px_1px_0px_rgba(28,27,26,0.5)]',
            'dark:shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(0,0,0,0.1),0_2px_2px_0_rgba(0,0,0,0.1),0_4px_4px_0_rgba(0,0,0,0.1),0_8px_8px_0_rgba(0,0,0,0.1)]'
          )}
        />
        <MinimalCardContent>
          <MinimalCardTitle title={title}>
            {getCuttedText(title, 24)}
          </MinimalCardTitle>
          <MinimalCardDescription title={shortDescription} className="h-[48px]">
            {getCuttedText(shortDescription, 58)}
          </MinimalCardDescription>
        </MinimalCardContent>

        <MinimalCardFooter className="flex justify-between">
          <Badge variant={getVariantLevel(level)}>{level}</Badge>
          <div className="flex items-center gap-3 text-muted-foreground text-sm">
            <div className="flex items-center gap-2">
              <Heart size={21} />
              <span>{likes}</span>
            </div>
            <div className="flex items-center gap-2">
              <Bookmark size={21} />
              <span>{bookmark.length}</span>
            </div>
          </div>
        </MinimalCardFooter>
      </MinimalCard>
    </>
  )
}
