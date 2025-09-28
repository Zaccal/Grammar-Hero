import type { FilterFormSchema } from '@/schemas/filter.schema'
import { sortLabels } from '@/schemas/filter.schema'
import { FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/Select'
import { filterContext } from './FilterContext'

export function FilterSort() {
  const form = filterContext.useSelect(state => state.form)

  return (
    <FormField
      control={form.control}
      name="sortField"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Sort</FormLabel>
          <FormControl>
            <Select
              value={`${field.value}_${form.watch('sort')}`}
              onValueChange={value => {
                const [sortField, sort] = value.split('_') as [
                  FilterFormSchema['sortField'],
                  FilterFormSchema['sort'],
                ]
                field.onChange(sortField)
                form.setValue('sort', sort)
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(sortLabels).map(([field, orders]) =>
                  Object.entries(orders).map(([order, label]) => (
                    <SelectItem
                      key={`${field}_${order}`}
                      value={`${field}_${order}`}
                    >
                      {label}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </FormControl>
        </FormItem>
      )}
    />
  )
}
