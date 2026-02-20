import type { FileRouteTypes } from '@/routeTree.gen'
import { createStore } from '@/hooks/createStore'

export interface OTPPropsOptions {
  redirectUrl?: FileRouteTypes['to']
  email: string
  type: 'sign-in' | 'email-verification' | 'forget-password'
}

export const OTPPropsStore = createStore<OTPPropsOptions>({
  email: '',
  type: 'email-verification',
})
