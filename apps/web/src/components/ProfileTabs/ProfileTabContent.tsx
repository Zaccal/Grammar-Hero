export interface TabsContentProps {
  value: string
  icon: React.ReactNode
  children: React.ReactNode | React.ReactNode[]
}

export function ProfileTabContent({ children }: TabsContentProps) {
  return <>{children}</>
}
