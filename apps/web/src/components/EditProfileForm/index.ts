import { EditProfileForm as Root } from './EditProfileForm'
import { EditProfileFormAvatar } from './EditProfileFormAvatar'
import EditProfileFormChangeEmail from './EditProfileFormChangeEmail'
import EditProfileFormChangePassword from './EditProfileFormChangePassword'
import { editProfileFormContext } from './EditProfileFormContext'
import { EditProfileFormDisplayUsername } from './EditProfileFormDisplayUsername'
import { EditProfileFormSaveButton } from './EditProfileFormSaveButton'

export const EditProfileForm = {
  Root,
  Avatar: EditProfileFormAvatar,
  context: editProfileFormContext,
  DisplayUsername: EditProfileFormDisplayUsername,
  SaveButton: EditProfileFormSaveButton,
  ChangeMail: EditProfileFormChangeEmail,
  ChangePassword: EditProfileFormChangePassword
}
