import type { MouseEvent } from 'react'
import { Button } from '@/components/ui/button'
import GoogleIcon from '@/components/ui/googleIcon'
import { useGoogleAuth } from '@/hooks'

export default function GoogleBtn() {
  const { mutate: googleAuth, isPending } = useGoogleAuth({
    callbackUrl: window.location.origin,
  })

  function submitHandler(
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) {
    event.stopPropagation()

    googleAuth()
  }

  return (
    <Button
      onClick={submitHandler}
      fullWidth
      loading={isPending}
      variant="outline"
    >
      <GoogleIcon />
      <span>Google</span>
    </Button>
  )
}
