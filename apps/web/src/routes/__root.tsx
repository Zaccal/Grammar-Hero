import { QueryClientProvider } from '@tanstack/react-query'
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  useRouterState,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import Header from '@/components/Header/header'
import Loader from '@/components/ui/loader'
import { Toaster } from '@/components/ui/sonner'
import { HIDE_HEADER_PATHS } from '@/lib/constants'
import { queryClient } from '@/lib/trpc'
import { ThemeProvider } from '@/providers/themeProvider'
import '../index.css'

export interface RouterAppContext {}

export const Route = createRootRouteWithContext<RouterAppContext>()({
  component: RootComponent,
  head: () => ({
    meta: [
      {
        title: 'Grammar-Hero',
      },
      {
        name: 'description',
        content: 'Grammar-Hero is a web application',
      },
    ],
    links: [
      {
        rel: 'icon',
        href: '/Logo.png',
      },
    ],
  }),
})

function RootComponent() {
  const isFetching = useRouterState({
    select: s => s.isLoading,
  })

  const pathname = useRouterState({
    select: state => state.location.pathname
  })

  const hideHeader = HIDE_HEADER_PATHS.includes(pathname)

  return (
    <>
      <HeadContent />
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light">
          {!hideHeader && <Header /> }
          {isFetching ? <Loader /> : <Outlet />}
          <Toaster richColors />
          <TanStackRouterDevtools position="bottom-left" />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  )
}
