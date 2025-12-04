import { changeEmailFormContext } from './ChangeEmailContext'
import { ChangeEmailForm as Root } from './ChangeEmailForm'
import { ChangeEmailNewEmailField } from './ChangeEmailNewEmailField'

export const ChangeEmailForm = {
  Root,
  Context: changeEmailFormContext,
  NewEmailField: ChangeEmailNewEmailField,
}
