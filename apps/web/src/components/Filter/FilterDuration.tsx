import { durationOptions } from '@/schemas/filter.schema'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/Select'
import { filterContext } from './FilterContext'

export function FilterDuration() {
  const form = filterContext.useSelect(state => state.form)

  return (
    <>
      <FormField
        control={form.control}
        name="duration"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Duration</FormLabel>
            <FormControl>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent>
                  {durationOptions.map(key => (
                    <SelectItem key={key} value={key}>
                      {key}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormDescription>Duration of the topic</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}
