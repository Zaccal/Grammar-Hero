import { worksContext } from './WorksContext'

interface WorksProps {
  children: React.ReactNode | React.ReactNode[]
}

export function Works({ children }: WorksProps) {
  return (
    <worksContext.Provider>
      {children}
    </worksContext.Provider>
  )
}
