interface PaginationTopicsListProps {
  children?: React.ReactNode | React.ReactNode[]
}

export function PaginationTopicsList({ children }: PaginationTopicsListProps) {
  return (
    <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">{children}</div>
  )
}
