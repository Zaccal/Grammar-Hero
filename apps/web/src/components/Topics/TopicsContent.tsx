import {
  MorphingDialogClose,
  MorphingDialogContainer,
  MorphingDialogContent,
} from '@/components/ui/morphing-dialog'
import { ScrollArea } from '../ui/scroll-area'

interface TopicsContentProps {
  children: React.ReactNode
}

export function TopicsContent({ children }: TopicsContentProps) {
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
