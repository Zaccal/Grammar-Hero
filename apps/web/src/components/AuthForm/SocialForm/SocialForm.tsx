import { Button } from '@/components/ui/button'
import MicrosoftIcon from '@/components/ui/microsoftIcon'
import GoogleBtn from './GoogleBtn'

function SocialForm() {
  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <GoogleBtn />
        <Button type="button" variant="outline">
          <MicrosoftIcon />
          <span>Microsoft</span>
        </Button>
      </div>
    </>
  )
}

export default SocialForm
