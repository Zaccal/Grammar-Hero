import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'
import { cn } from '@/lib/utils'

interface TopicDetailsContentProps {
  children?: string
  className?: string
}

const TopicDetailsContent = ({
  children,
  className,
}: TopicDetailsContentProps) => {
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
