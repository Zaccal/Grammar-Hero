import { MorphingDialogSubtitle } from '../ui/morphing-dialog'

interface TopicsSubtitleProps {
  children: React.ReactNode
}

export function TopicsSubtitle({ children }: TopicsSubtitleProps) {
  return (
    <MorphingDialogSubtitle className="text-zinc-700 dark:text-zinc-400">
      {children}
    </MorphingDialogSubtitle>
  )
}
