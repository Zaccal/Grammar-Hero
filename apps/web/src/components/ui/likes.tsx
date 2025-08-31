import { cn } from '@/lib/utils'
import { Heart } from 'lucide-react'
import type { HTMLAttributes } from 'react'

interface LikesProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const Likes = ({ children, className, ...props }: LikesProps) => {
  return (
    <div
      {...props}
      className={cn(
        'text-muted-foreground text-sm flex items-center gap-1',
        className
      )}
    >
      <Heart size={24} />
      {children}
    </div>
  )
}

export default Likes
