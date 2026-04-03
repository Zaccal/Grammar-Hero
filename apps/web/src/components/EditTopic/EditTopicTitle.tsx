import type { CreateTopicFormSchema as EditTopicFormSchema } from '@/schemas/createTopicForm.schema'
import { useFormContext } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'

export function EditTopicTitle() {
  const form = useFormContext<EditTopicFormSchema>()

  return (
    <>
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormMessage />
            <FormControl>
              <Input
                disabled={form.formState.isSubmitting}
                variant="lg"
                {...field}
                placeholder="Enter title"
              />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  )
}
