import { MorphingDialogTitle } from '../ui/morphing-dialog'

interface TopicsTitleProps {
  children: React.ReactNode
}

export function TopicsTitle({ children }: TopicsTitleProps) {
  return (
    <MorphingDialogTitle className="text-2xl text-zinc-950 dark:text-zinc-50">
      {children}
    </MorphingDialogTitle>
  )
}
