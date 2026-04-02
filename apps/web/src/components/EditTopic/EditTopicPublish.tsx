import { EDIT_FORM_ID } from '@/lib/constants'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog'
import { Button, type ButtonProps } from '../ui/button'
import { EditTopicAlertDialogStore } from './store'

export function EditTopicPublish({ children, ...props }: ButtonProps) {
  const open = EditTopicAlertDialogStore.use(state => state)

  return (
    <>
      <AlertDialog open={open} onOpenChange={EditTopicAlertDialogStore.set}>
        <AlertDialogTrigger asChild>
          <Button {...props}>{children}</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Topic Creation</AlertDialogTitle>
            <AlertDialogDescription>
              Please review your details before creating this topic. Once
              submitted, the topic will be visible to others and cannot be
              easily changed.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Not sure</AlertDialogCancel>
            <Button form={EDIT_FORM_ID} type="submit">
              Confirm
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
