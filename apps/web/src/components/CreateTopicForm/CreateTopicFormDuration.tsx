import { durationOptions } from '@/schemas/filter.schema'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/Select'
import { createTopicFormContext } from './CreateTopicFormContext'
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { useFileUploadMutationState } from '@/hooks/index'

export const CreateTopicFormDuration = () => {
  const form = createTopicFormContext.useSelect(state => state.form)
  const { isPending } = useFileUploadMutationState()

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
                    if (option === 'All') return null
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
