import { useFormContext } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Textarea } from '../ui/textarea'
import type { CreateTopicFormSchema } from '@/schemas/createTopicForm.schema'

export function CreateTopicFormDescription() {
  const form = useFormContext<CreateTopicFormSchema>()
  const isPending = form.formState.isSubmitting

  return (
    <>
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormMessage />
            <FormControl>
              <Textarea
                variant="lg"
                disabled={isPending}
                placeholder="Topic full description"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  )
}
