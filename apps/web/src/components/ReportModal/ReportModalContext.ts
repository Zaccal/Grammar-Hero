import { createContext } from '@/hooks'

interface ReportModalContext {
  onSuccess?: () => void
  userId: string
}

export const reportModalContext = createContext<ReportModalContext>()
