import { FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/Select'
import { CreateTopicFormContext } from './CreateTopicFormContext'

export function CreateTopicFormLevel() {
  const form = CreateTopicFormContext.useSelect(state => state.form)
  const isPending = CreateTopicFormContext.useSelect(state => state.isPending)

  return (
    <>
      <FormField
        control={form.control}
        name="level"
        render={({ field }) => (
          <FormItem>
            <FormMessage />
            <FormControl>
              <Select
                disabled={isPending}
                onValueChange={field.onChange}
                value={field.value ?? ''}
              >
                <SelectTrigger>
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
