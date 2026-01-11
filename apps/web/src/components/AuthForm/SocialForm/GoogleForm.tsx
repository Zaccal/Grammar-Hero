import { Button } from '@/components/ui/button'
import GoogleIcon from '@/components/ui/googleIcon'
import { useGoogleAuth } from '@/hooks'

export default function GoogleForm() {
  const { mutate: googleAuth, isPending } = useGoogleAuth({
    callbackUrl: import.meta.env.VITE_CLIENT_URL,
  })

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    googleAuth()
  }

  return (
    <form onSubmit={submitHandler}>
      <Button fullWidth loading={isPending} variant="outline">
        <GoogleIcon />
        <span>Google</span>
      </Button>
    </form>
  )
}
