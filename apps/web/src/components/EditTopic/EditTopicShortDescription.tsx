import type { CreateTopicFormSchema as EditTopicFormSchema } from '@/schemas/createTopicForm.schema'
import { useFormContext } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Textarea } from '../ui/textarea'

export function EditTopicShortDescription() {
  const form = useFormContext<EditTopicFormSchema>()

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
                {...field}
                placeholder="Enter short description"
                disabled={form.formState.isSubmitting}
                variant="lg"
              />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  )
}
