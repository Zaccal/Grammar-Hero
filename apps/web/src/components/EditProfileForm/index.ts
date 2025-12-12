import { EditProfileForm as Root } from './EditProfileForm'
import { EditProfileFormAvatar } from './EditProfileFormAvatar'
import EditProfileFormChangeEmail from './EditProfileFormChangeEmail'
import EditProfileFormChangePassword from './EditProfileFormChangePassword'
import { editProfileFormContext } from './EditProfileFormContext'
import { EditProfileFormDisplayUsername } from './EditProfileFormDisplayUsername'

export const EditProfileForm = {
  Root,
  Avatar: EditProfileFormAvatar,
  context: editProfileFormContext,
  DisplayUsername: EditProfileFormDisplayUsername,
  ChangeMail: EditProfileFormChangeEmail,
  ChangePassword: EditProfileFormChangePassword,
}
