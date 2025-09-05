import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'
import 'github-markdown-css/github-markdown.css'
import { cn } from '@/lib/utils'

interface TopicDetailsContentProps {
  children?: string
  className?: string
}

const TopicDetailsContent = ({
  children,
  className,
}: TopicDetailsContentProps) => {
  return (
    <div className={cn(className, 'markdown-body')}>
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
