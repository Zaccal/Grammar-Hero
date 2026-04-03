import type { ButtonProps } from '../ui/button'
import { CREATE_FORM_ID } from '@/lib/constants'
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
import { Button } from '../ui/button'
import { CreateTopicFormContext } from './CreateTopicFormContext'
import { alertDialogCreateTopicStore } from './store'

export function CreateTopicFormPublish({ children, ...props }: ButtonProps) {
  const isPending = CreateTopicFormContext.useSelect(state => state.isPending)

  // I need the controlled state because I want to close the alertDialog when the loadihng state is finished
  const open = alertDialogCreateTopicStore.use(state => state.open)

  return (
    <>
      <AlertDialog
        open={open}
        onOpenChange={state => {
          alertDialogCreateTopicStore.set({
            open: state,
          })
        }}
      >
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
            <Button loading={isPending} type="submit" form={CREATE_FORM_ID}>
              Publish
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
