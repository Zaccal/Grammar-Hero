import {
  MorphingDialogImage,
  type MorphingDialogImageProps,
} from '../ui/morphing-dialog'

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
