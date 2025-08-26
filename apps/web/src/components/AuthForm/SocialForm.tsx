import GoogleIcon from '../ui/googleIcon'
import MicrosoftIcon from '../ui/microsoftIcon'
import { Button } from '../ui/button'

const SocialForm = () => {
  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <Button type="button" variant="outline">
          <GoogleIcon />
          <span>Google</span>
        </Button>
        <Button type="button" variant="outline">
          <MicrosoftIcon />
          <span>Microsoft</span>
        </Button>
      </div>
    </>
  )
}

export default SocialForm
