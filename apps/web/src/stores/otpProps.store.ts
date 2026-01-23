import type { FileRouteTypes } from '@/routeTree.gen'
import { createStore } from '@/hooks/createStore'

export interface OTPPropsOptions {
  redirectUrl?: FileRouteTypes['to']
}

export const OTPPropsStore = createStore<OTPPropsOptions>({})
