import type { Result } from './types/result.type'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import ReactDOM from 'react-dom/client'
import DefaultErrorComponent from './components/DefaultErrorComponent/DefaultErrorComponent'
import DefaultNotFoundErrorComponent from './components/DefaultNotFoundErrorComponent/DefaultNotFoundErrorComponent'
import Loader from './components/ui/loader'
import { routeTree } from './routeTree.gen'

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultPendingComponent: () => <Loader />,
  defaultErrorComponent: error => <DefaultErrorComponent {...error} />,
  defaultNotFoundComponent: () => <DefaultNotFoundErrorComponent />,
  context: {},
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
  interface HistoryState {
    quizResults?: Result
  }
}

const rootElement = document.getElementById('app')

if (!rootElement) {
  throw new Error('Root element not found')
}

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(<RouterProvider router={router} />)
}
