import { AtSign } from 'lucide-react'
import { Button } from '../ui/button'
import { Input, InputWrapper } from '../ui/input'
import { editProfileFormContext } from './EditProfileFormContext'

function EditProfileFormChangeEmail() {
  const { email } = editProfileFormContext.useSelect(state => state.user)

  return (
    <div className="flex items-center gap-3">
      <InputWrapper>
        <Input value={email} disabled />
        <AtSign />
      </InputWrapper>
      <Button type="button">Change</Button>
    </div>
  )
}

export default EditProfileFormChangeEmail
