import { use } from 'react'
import { ThemeProviderContext } from '@/providers/themeProvider'

export function useTheme() {
  const context = use(ThemeProviderContext)

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}
