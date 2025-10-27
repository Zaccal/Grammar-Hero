import { Key } from 'lucide-react'
import { Button } from '../ui/button'
import { Input, InputWrapper } from '../ui/input'

function EditProfileFormChangePassword() {
  return (
    <>
      <div className="flex items-center gap-3">
        <InputWrapper>
          <Input value="******" disabled />
          <Key />
        </InputWrapper>
        <Button>Change</Button>
      </div>
    </>
  )
}

export default EditProfileFormChangePassword
