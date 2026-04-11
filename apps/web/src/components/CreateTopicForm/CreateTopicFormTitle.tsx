import type { CreateTopicFormSchema } from '@/schemas/createTopicForm.schema'
import { useFormContext } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'

export function CreateTopicFormTitle() {
  const form = useFormContext<CreateTopicFormSchema>()
  const isPending = form.formState.isSubmitting

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
                disabled={isPending}
                variant="lg"
                placeholder="Topic title"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  )
}
