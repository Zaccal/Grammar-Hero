import { MorphingDialogTrigger } from '../ui/morphing-dialog'

export function TopicsPreview({ children }: { children: React.ReactNode }) {
  return <MorphingDialogTrigger>{children}</MorphingDialogTrigger>
}
