import { durationOptions } from '@/schemas/filter.schema'
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/Select'
import type { CreateTopicFormSchema } from '@/schemas/createTopicForm.schema'
import { useFormContext } from 'react-hook-form'

export function CreateTopicFormDuration() {
  const form = useFormContext<CreateTopicFormSchema>()
  const isPending = form.formState.isSubmitting

  return (
    <>
      <FormField
        control={form.control}
        name="duration"
        render={({ field }) => (
          <FormItem>
            <FormMessage />
            <FormControl>
              <Select
                disabled={isPending}
                onValueChange={field.onChange}
                value={field.value}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(durationOptions).map(option => {
                    if (option === 'All') {
                      return null
                    }
                    return (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        )}
      />
    </>
  )
}
