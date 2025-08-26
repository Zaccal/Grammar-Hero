import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

interface LoaderProps {
  className?: string
}

export default function Loader({ className }: LoaderProps) {
  return (
    <div
      className={cn('flex h-full items-center justify-center pt-8', className)}
    >
      <Loader2 className="animate-spin" />
    </div>
  )
}
