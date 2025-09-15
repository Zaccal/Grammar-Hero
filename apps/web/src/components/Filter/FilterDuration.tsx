import { durationOptions } from '@/schemas/filter.schema'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '../ui/form'
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from '../ui/Select'
import { filterContext } from './Filter'

export const FilterDuration = () => {
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
