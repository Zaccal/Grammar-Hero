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

  return (
    <>
      <HeadContent />
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light">
          <Header />
          {isFetching ? <Loader /> : <Outlet />}
          <Toaster richColors />
          <TanStackRouterDevtools position="bottom-left" />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  )
}
