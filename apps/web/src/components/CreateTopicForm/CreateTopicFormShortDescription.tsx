import type { CreateTopicFormSchema } from '@/schemas/createTopicForm.schema'
import { useFormContext } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Textarea } from '../ui/textarea'

export function CreateTopicFormShortDescription() {
  const form = useFormContext<CreateTopicFormSchema>()
  const isPending = form.formState.isSubmitting

  return (
    <>
      <FormField
        control={form.control}
        name="shortDescription"
        render={({ field }) => (
          <FormItem>
            <FormMessage />
            <FormControl>
              <Textarea
                variant="lg"
                disabled={isPending}
                placeholder="Topic short description"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  )
}
