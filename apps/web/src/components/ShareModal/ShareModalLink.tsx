import { Copy, CopyCheck } from 'lucide-react'
import { useCopy } from '@/hooks'
import { Button } from '../ui/button'

interface ShareModalLinkProps {
  link: string
}

export function ShareModalLink({ link }: ShareModalLinkProps) {
  const { copy, copied } = useCopy()

  return (
    <div className="space-y-2 mt-4">
      <p className="text-sm">Page Link</p>
      <div className="flex items-center justify-between bg-muted py-3 px-4 rounded-md">
        <p className="text-sm text-nowrap max-w-xs overflow-x-hidden text-muted-foreground">
          {link}
        </p>
        <Button onClick={() => copy(link)} size="icon" variant="ghost">
          {copied ? <CopyCheck /> : <Copy />}
        </Button>
      </div>
    </div>
  )
}
