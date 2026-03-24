import { createContext } from '@/hooks'

interface ReportModalContextProps {
  onSuccess?: () => void
  userId: string
}

export const ReportModalContext = createContext<ReportModalContextProps>()
