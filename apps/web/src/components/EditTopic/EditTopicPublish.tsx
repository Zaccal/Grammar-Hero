import type { ButtonProps } from '../ui/button'
import type { CreateTopicFormSchema as EditTopicFormSchema } from '@/schemas/createTopicForm.schema'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useDidUpdate } from '@/hooks'
import { EDIT_FORM_ID } from '@/lib/constants'
import { isEqual } from '@/utils/isEqual'
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
import { EditTopicContext } from './EditTopicContext'
import { EditTopicAlertDialogStore } from './store'

export default function EditTopicPublish({ children, ...props }: ButtonProps) {
  const open = EditTopicAlertDialogStore.use(state => state)
  const form = useFormContext<EditTopicFormSchema>()
  const formValues = form.watch()
  const topic = EditTopicContext.useSelect(state => state)
  const [isEqualValue, setIsEqualValue] = useState(true)

  useDidUpdate(() => {
    setIsEqualValue(isEqual(normalize(topic), normalize(formValues)))
  }, [formValues, topic])

  return (
    <>
      <AlertDialog open={open} onOpenChange={EditTopicAlertDialogStore.set}>
        <AlertDialogTrigger asChild>
          <Button disabled={isEqualValue} {...props}>
            {children}
          </Button>
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
            <Button
              loading={form.formState.isSubmitting}
              form={EDIT_FORM_ID}
              type="submit"
            >
              Confirm
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

const NORMALIZE_REGEX = /\n+/g

function normalize(obj: any) {
  return {
    ...obj,
    content: obj.content.trim().replace(NORMALIZE_REGEX, '\n\n'),
  }
}
