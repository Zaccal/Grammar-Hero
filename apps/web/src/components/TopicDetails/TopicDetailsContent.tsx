import ReactMarkdown from 'react-markdown'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import { cn } from '@/lib/utils'
import { TopicDetailsContext } from './TopicDetailsContext'

interface TopicDetailsContentProps {
  className?: string
}

export function TopicDetailsContent({ className }: TopicDetailsContentProps) {
  const content = TopicDetailsContext.useSelect(state => state.content)

  // TODO: Create a style for highlighted texts
  return (
    <div className={cn(className, 'markdown-typography wrap-break-word')}>
      {' '}
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings, rehypeHighlight]}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
