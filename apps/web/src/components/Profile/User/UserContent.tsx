interface UserContentProps {
  children: React.ReactNode | React.ReactNode[]
}

export function UserContent({ children }: UserContentProps) {
  return <div className="space-y-3">{children}</div>
}
