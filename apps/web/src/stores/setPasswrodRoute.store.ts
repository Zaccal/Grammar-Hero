import { createStore } from '@/hooks/createStore'

export interface SetPasswordRouteStoreOptions {
  email: string
  otp: string
}

export const SetPasswordRouteStore = createStore<SetPasswordRouteStoreOptions>({
  email: '',
  otp: '',
})
