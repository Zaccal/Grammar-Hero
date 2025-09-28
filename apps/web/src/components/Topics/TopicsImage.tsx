import type { MorphingDialogImageProps } from '../ui/morphing-dialog'
import { MorphingDialogImage } from '../ui/morphing-dialog'

interface TopicsImageProps extends Omit<MorphingDialogImageProps, 'src'> {
  src: string | null
}

export function TopicsImage({ src, ...props }: TopicsImageProps) {
  return (
    <>
      <MorphingDialogImage loading="lazy" {...props} src={src ?? '/bg.png'} />
    </>
  )
}
