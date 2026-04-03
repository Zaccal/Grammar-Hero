import type { CreateTopicFormSchema as EditTopicFormSchema } from '@/schemas/createTopicForm.schema'
import { useFormContext } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Textarea } from '../ui/textarea'

export function EditTopicDescription() {
  const form = useFormContext<EditTopicFormSchema>()

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
                {...field}
                placeholder="Enter description"
                variant="lg"
              />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  )
}
