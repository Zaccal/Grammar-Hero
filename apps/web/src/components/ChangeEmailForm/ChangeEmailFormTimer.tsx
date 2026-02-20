import { ChangeEmailFormStore } from './ChangeEmailFormStore'

export function ChangeEmailFormTimer() {
  const timer = ChangeEmailFormStore.use(state => state)

  if (!timer) {
    return null
  }

  return (
    <>
      {timer.active && (
        <p className="text-muted-foreground text-sm">
          Email sent. You can retry in {String(timer.seconds).padStart(2, '0')}s
        </p>
      )}
    </>
  )
}
