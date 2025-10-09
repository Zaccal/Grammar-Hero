import { Heart, type LucideProps } from 'lucide-react'

interface HeartLikeProps extends LucideProps {
  liked: boolean
}

export default function HeartLike({ liked, ...props }: HeartLikeProps) {
  return liked ? (
    <Heart fill="#ef4444" color="#ef4444" {...props} />
  ) : (
    <Heart {...props} />
  )
}
