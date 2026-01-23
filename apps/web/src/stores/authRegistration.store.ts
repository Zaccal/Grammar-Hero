import { createStore } from '@/hooks/createStore'

export interface AuthRegistrationStoreOptions {
  email: string
  otp: string
}

export const AuthRegistrationStore = createStore<AuthRegistrationStoreOptions>({
  email: '',
  otp: '',
})
