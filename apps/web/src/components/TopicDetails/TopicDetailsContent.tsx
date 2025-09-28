import ReactMarkdown from 'react-markdown'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import { cn } from '@/lib/utils'

interface TopicDetailsContentProps {
  children?: string
  className?: string
}

function TopicDetailsContent({
  children,
  className,
}: TopicDetailsContentProps) {
  // TODO: Create a style for highlighted texts
  return (
    <div className={cn(className, 'markdown-typography')}>
      {' '}
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings, rehypeHighlight]}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}

export default TopicDetailsContent
