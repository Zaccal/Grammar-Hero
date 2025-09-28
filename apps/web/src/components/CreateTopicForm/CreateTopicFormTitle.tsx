import { FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { createTopicFormContext } from './CreateTopicFormContext'

export function CreateTopicFormTitle() {
  const form = createTopicFormContext.useSelect(state => state.form)
  const isPending = createTopicFormContext.useSelect(state => state.isPending)

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
