import { getVariantLevel } from '@/lib/getVariantLevel'
import type { Topics as TypeTopics } from '../../../../server/prisma/generated/client'
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

export const TopicDialog = {
  Root: Topic,
  List: TopicsList,
  Preview: TopicPreview,
  Content: TopicContent,
  Image: TopicImage,
  Title: TopicTitle,
  Subtitle: TopicSubtitle,
  Description: TopicDescription,
  Actions: TopicActions,
}

interface TopicsProps {
  children: React.ReactNode | React.ReactNode[]
}

export function TopicsList({ children }: TopicsProps) {
  return (
    <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 ">
      {children}
    </div>
  )
}

export function Topic({ children }: TopicsProps) {
  return (
    <MorphingDialog
      transition={{
        type: 'spring',
        bounce: 0.05,
        duration: 0.25,
      }}
    >
      {children}
    </MorphingDialog>
  )
}

export function TopicPreview({ children }: TopicsProps) {
  return <MorphingDialogTrigger>{children}</MorphingDialogTrigger>
}

interface TopicCardProps {
  topic: TypeTopics
}

export function TopicCard({ topic }: TopicCardProps) {
  return (
    <>
      <MinimalCard className="h-full text-left">
        <TopicImage
          alt={topic.title}
          src={topic.image}
          className={cn(
            'relative h-[190px] w-full rounded-[20px] mb-6',
            'shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05),0px_1px_1px_0px_rgba(255,252,240,0.5)_inset,0px_0px_0px_1px_hsla(0,0%,100%,0.1)_inset,0px_0px_1px_0px_rgba(28,27,26,0.5)]',
            'dark:shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(0,0,0,0.1),0_2px_2px_0_rgba(0,0,0,0.1),0_4px_4px_0_rgba(0,0,0,0.1),0_8px_8px_0_rgba(0,0,0,0.1)]'
          )}
        />
        <MinimalCardContent>
          <MinimalCardTitle>{topic.title}</MinimalCardTitle>
          <MinimalCardDescription className="h-[48px]">
            {topic.shortDescription}
          </MinimalCardDescription>
        </MinimalCardContent>

        <MinimalCardFooter className="flex justify-between">
          <Badge variant={getVariantLevel(topic.level)}>{topic.level}</Badge>
          <div className="flex items-center gap-3">
            <Likes>{topic.likes}</Likes>
            <Favorite />
          </div>
        </MinimalCardFooter>
      </MinimalCard>
    </>
  )
}

export function TopicContent({ children }: TopicsProps) {
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

interface TopicImage extends Omit<MorphingDialogImageProps, 'src'> {
  src: string | null
}

export function TopicImage({ src, ...props }: TopicImage) {
  return (
    <>
      <MorphingDialogImage loading="lazy" {...props} src={src ?? '/bg.png'} />
    </>
  )
}

export function TopicTitle({ children }: TopicsProps) {
  return (
    <MorphingDialogTitle className="text-2xl text-zinc-950 dark:text-zinc-50">
      {children}
    </MorphingDialogTitle>
  )
}

export function TopicSubtitle({ children }: TopicsProps) {
  return (
    <MorphingDialogSubtitle className="text-zinc-700 dark:text-zinc-400">
      {children}
    </MorphingDialogSubtitle>
  )
}

export function TopicDescription({ children }: TopicsProps) {
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

export function TopicActions() {
  return (
    <div className="mt-8 flex justify-between items-center">
      <Button asChild size={'lg'}>
        <Link to={`/`}>Start learning</Link>
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

export function TopicDialogCard({ topic }: TopicCardProps) {
  return (
    <TopicDialog.Root>
      <TopicDialog.Preview>
        <TopicCard topic={topic} />
      </TopicDialog.Preview>
      <TopicDialog.Content>
        <TopicDialog.Image
          src={topic.image}
          alt={topic.title}
          className="w-full max-h-[400px] h-full"
        />
        <div className="p-6">
          <TopicDialog.Title>{topic.title}</TopicDialog.Title>
          <TopicDialog.Subtitle>{topic.duration}</TopicDialog.Subtitle>
          <TopicDialog.Description>
            <p className="mt-2 text-sm leading-[1.325rem] text-muted-foreground">
              {topic.description}
            </p>

            <TopicDialog.Actions />
          </TopicDialog.Description>
        </div>
      </TopicDialog.Content>
    </TopicDialog.Root>
  )
}
