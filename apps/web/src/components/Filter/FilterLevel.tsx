import { FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/Select'
import { filterContext } from './FilterContext'

export function FilterLevel() {
  const form = filterContext.useSelect(state => state.form)

  return (
    <FormField
      control={form.control}
      name="level"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Level</FormLabel>
          <FormControl>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Levels</SelectItem>
                <SelectItem value="Basic">Basic</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
        </FormItem>
      )}
    />
  )
}
