import { cn } from '@/lib/utils'
import { Info } from 'lucide-react'
import type { AnchorHTMLAttributes } from 'react'

interface CreateTopicFormMarkdownHintProps {
  children: React.ReactNode
}

export const CreateTopicFormMarkdownHint = ({
  children,
}: CreateTopicFormMarkdownHintProps) => {
  return (
    <>
      <p className="text-muted-foreground text-xs">
        <Info className="size-4 inline mr-1" /> {children}{' '}
      </p>
    </>
  )
}

export const CreateTopicFormMarkdownHintLink = ({
  children,
  className,
  target,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) => {
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
