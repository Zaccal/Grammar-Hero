import { EditProfile as Root } from './EditProfile'
import { EditProfileAvatarField } from './EditProfileAvatarField'
import { EditProfileChangeEmailField } from './EditProfileChangeEmailField'
import EditProfileNameField from './EditProfileNameField'
import { EditProfileSubmit } from './EditProfileSubmit'

export const EditProfile = {
  Root,
  AvatarField: EditProfileAvatarField,
  NameField: EditProfileNameField,
  Submit: EditProfileSubmit,
  EmailField: EditProfileChangeEmailField
}
