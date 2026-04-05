import type { CreateTopicFormSchema as EditTopicFormSchema } from '@/schemas/createTopicForm.schema'
import { useFormContext } from 'react-hook-form'
import { durationOptions } from '@/schemas/filter.schema'
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/Select'

export function EditTopicDuration() {
  const form = useFormContext<EditTopicFormSchema>()

  return (
    <>
      <FormField
        control={form.control}
        name="duration"
        render={({ field }) => (
          <FormItem>
            <FormMessage />
            <FormControl>
              <Select onValueChange={field.onChange} value={field.value}>
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
