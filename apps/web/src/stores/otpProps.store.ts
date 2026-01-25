import type { FileRouteTypes } from '@/routeTree.gen'
import { createStore } from '@/hooks/createStore'

export interface OTPPropsOptions {
  redirectUrl?: FileRouteTypes['to']
  email: string
}

export const OTPPropsStore = createStore<OTPPropsOptions>({
  email: '',
})
