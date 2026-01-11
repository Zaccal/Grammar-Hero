import { Button } from '@/components/ui/button'
import MicrosoftIcon from '@/components/ui/microsoftIcon'
import GoogleForm from './GoogleForm'

function SocialForm() {
  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <GoogleForm />
        <Button type="button" variant="outline">
          <MicrosoftIcon />
          <span>Microsoft</span>
        </Button>
      </div>
    </>
  )
}

export default SocialForm
