import { AtSign } from 'lucide-react'
import { authClient } from '@/lib/auth-client'
import { Button } from '../ui/button'
import { Input, InputWrapper } from '../ui/input'
import { editProfileFormContext } from './EditProfileFormContext'

function EditProfileFormChangeEmail() {
  const { email } = editProfileFormContext.useSelect(state => state.user)

  async function changeEmailHandler() {
    authClient.changeEmail({
      newEmail: 'mainjs76@gmail.com',
      callbackURL: '/',
    })
  }

  return (
    <div className="flex items-center gap-3">
      <InputWrapper>
        <Input value={email} disabled />
        <AtSign />
      </InputWrapper>
      <Button onClick={changeEmailHandler} type="button">
        Change
      </Button>
    </div>
  )
}

export default EditProfileFormChangeEmail
