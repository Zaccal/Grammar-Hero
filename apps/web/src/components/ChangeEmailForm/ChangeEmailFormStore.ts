import type { UseTimerReturn } from '@/hooks/useTimer/useTimer'
import { createStore } from '@/hooks/createStore'

export const ChangeEmailFormStore = createStore<UseTimerReturn | null>(null)
