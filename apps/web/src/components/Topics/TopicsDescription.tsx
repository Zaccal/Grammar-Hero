import { MorphingDialogDescription } from '../ui/morphing-dialog'

interface TopicsDescriptionProps {
  children: React.ReactNode
}

export function TopicsDescription({ children }: TopicsDescriptionProps) {
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
