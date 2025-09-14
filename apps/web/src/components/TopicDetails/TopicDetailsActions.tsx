interface TopicDetailsActionsProps {
  children?: React.ReactNode
}

export function TopicDetailsActions({ children }: TopicDetailsActionsProps) {
  return (
    <>
      <div className="flex items-center justify-between">{children}</div>
    </>
  )
}
