import type { AnchorHTMLAttributes } from 'react'
import { Info } from 'lucide-react'
import { cn } from '@/lib/utils'

interface EditTopicFormMarkdownHintProps {
  children: React.ReactNode
}

export function EditTopicFormMarkdownHint({
  children,
}: EditTopicFormMarkdownHintProps) {
  return (
    <>
      <p className="text-muted-foreground text-xs">
        <Info className="size-4 inline mr-1" /> {children}{' '}
      </p>
    </>
  )
}

export function EditTopicFormMarkdownHintLink({
  children,
  className,
  target,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      target={target ?? '_blank'}
      className={cn('font-semibold', className)}
      {...props}
    >
      {children}
    </a>
  )
}
