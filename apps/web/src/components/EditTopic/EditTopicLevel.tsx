import type { CreateTopicFormSchema as EditTopicFormSchema } from '@/schemas/createTopicForm.schema'
import { useFormContext } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/Select'

export function EditTopicLevel() {
  const form = useFormContext<EditTopicFormSchema>()

  return (
    <>
      <FormField
        control={form.control}
        name="level"
        render={({ field }) => (
          <FormItem>
            <FormMessage />
            <FormControl>
              <Select onValueChange={field.onChange} value={field.value ?? ''}>
                <SelectTrigger disabled={form.formState.isSubmitting}>
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Basic">Basic</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        )}
      />
    </>
  )
}
