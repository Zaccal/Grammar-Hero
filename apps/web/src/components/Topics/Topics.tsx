import { getVariantLevel } from '@/lib/getVariantLevel'
import type { Topics } from '../../../../server/prisma/generated/client'
import { Badge } from '../ui/Badge'
import {
  MorphingDialog,
  MorphingDialogClose,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogDescription,
  MorphingDialogImage,
  MorphingDialogSubtitle,
  MorphingDialogTitle,
  MorphingDialogTrigger,
  type MorphingDialogImageProps,
} from '../ui/morphing-dialog'
import {
  MinimalCard,
  MinimalCardContent,
  MinimalCardDescription,
  MinimalCardFooter,
  MinimalCardTitle,
} from '../ui/SimpleCards'
import Likes from '../ui/likes'
import Favorite from '../ui/favorite'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { Link } from '@tanstack/react-router'
import { Heart, Star } from 'lucide-react'
import { ScrollArea } from '../ui/scroll-area'
import { createContext } from '@/hooks'

const topicsContext = createContext<Topics>()
interface TopicsSharedProps {
  children: React.ReactNode | React.ReactNode[]
}

export function TopicsList({ children }: TopicsSharedProps) {
  return (
    <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 ">
      {children}
    </div>
  )
}

interface TopicsProps extends TopicsSharedProps {
  topic: Topics
}

export function Topic({ children, topic }: TopicsProps) {
  return (
    <topicsContext.Provider initialValue={topic}>
      <MorphingDialog
        transition={{
          type: 'spring',
          bounce: 0.05,
          duration: 0.25,
        }}
      >
        {children}
      </MorphingDialog>
    </topicsContext.Provider>
  )
}

export function TopicsPreview({ children }: TopicsSharedProps) {
  return <MorphingDialogTrigger>{children}</MorphingDialogTrigger>
}

export function TopicsCard() {
  const { title, image, shortDescription, level, likes } =
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
          <MinimalCardTitle>{title}</MinimalCardTitle>
          <MinimalCardDescription className="h-[48px]">
            {shortDescription}
          </MinimalCardDescription>
        </MinimalCardContent>

        <MinimalCardFooter className="flex justify-between">
          <Badge variant={getVariantLevel(level)}>{level}</Badge>
          <div className="flex items-center gap-3">
            <Likes>{likes}</Likes>
            <Favorite />
          </div>
        </MinimalCardFooter>
      </MinimalCard>
    </>
  )
}

export function TopicsContent({ children }: TopicsSharedProps) {
  return (
    <MorphingDialogContainer>
      <MorphingDialogContent
        style={{
          borderRadius: '24px',
        }}
        className="pointer-events-auto relative flex max-h-[var(--DIALOG-MAX-H)] w-full flex-col overflow-hidden border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900 sm:w-[500px]"
      >
        <ScrollArea className="!overflow-y-auto ">{children}</ScrollArea>
        <MorphingDialogClose className="text-zinc-50" />
      </MorphingDialogContent>
    </MorphingDialogContainer>
  )
}

interface TopicsImage extends Omit<MorphingDialogImageProps, 'src'> {
  src: string | null
}

export function TopicsImage({ src, ...props }: TopicsImage) {
  return (
    <>
      <MorphingDialogImage loading="lazy" {...props} src={src ?? '/bg.png'} />
    </>
  )
}

export function TopicsTitle({ children }: TopicsSharedProps) {
  return (
    <MorphingDialogTitle className="text-2xl text-zinc-950 dark:text-zinc-50">
      {children}
    </MorphingDialogTitle>
  )
}

export function TopicsSubtitle({ children }: TopicsSharedProps) {
  return (
    <MorphingDialogSubtitle className="text-zinc-700 dark:text-zinc-400">
      {children}
    </MorphingDialogSubtitle>
  )
}

export function TopicsDescription({ children }: TopicsSharedProps) {
  return (
    <MorphingDialogDescription
      disableLayoutAnimation
      variants={{
        initial: { opacity: 0, scale: 0.8, y: 100 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.8, y: 100 },
      }}
    >
      {children}
    </MorphingDialogDescription>
  )
}

export function TopicsActions() {
  const id = topicsContext.useSelect(state => state.id)
  return (
    <div className="mt-8 flex justify-between items-center">
      <Button asChild size={'lg'}>
        <Link
          to={`/topic/$id`}
          params={{
            id,
          }}
        >
          Start learning
        </Link>
      </Button>
      <div className="space-x-3">
        <Button size={'icon'} variant={'secondary'} aria-label="like">
          <Heart />
        </Button>
        <Button
          size={'icon'}
          variant={'secondary'}
          aria-label="add to favorites"
        >
          <Star />
        </Button>
      </div>
    </div>
  )
}

export const TopicsDialog = {
  Root: Topic,
  List: TopicsList,
  Preview: TopicsPreview,
  Content: TopicsContent,
  Image: TopicsImage,
  Title: TopicsTitle,
  Subtitle: TopicsSubtitle,
  Description: TopicsDescription,
  Actions: TopicsActions,
}
