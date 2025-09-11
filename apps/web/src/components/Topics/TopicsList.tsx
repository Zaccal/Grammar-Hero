interface TopicsListProps {
  children: React.ReactNode | React.ReactNode[]
}

export function TopicsList({ children }: TopicsListProps) {
  return (
    <div className="container-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 ">
      {children}
    </div>
  )
}
