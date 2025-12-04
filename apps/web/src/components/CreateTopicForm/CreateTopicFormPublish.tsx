import type { ButtonProps } from '../ui/button'
import { FORM_ID } from '@/lib/constants'
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
import Loader from '../ui/loader'
import { createTopicFormContext } from './CreateTopicFormContext'
import { alertDialogCreateTopicStore } from './store'

export function CreateTopicFormPublish({ children, ...props }: ButtonProps) {
  const isPending = createTopicFormContext.useSelect(state => state.isPending)

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
            <Button disabled={isPending} type="submit" form={FORM_ID}>
              {isPending && <Loader className="pt-0" />}
              Publish
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
