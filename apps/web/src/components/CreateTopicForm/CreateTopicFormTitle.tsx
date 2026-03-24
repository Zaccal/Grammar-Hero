import { FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { CreateTopicFormContext } from './CreateTopicFormContext'

export function CreateTopicFormTitle() {
  const form = CreateTopicFormContext.useSelect(state => state.form)
  const isPending = CreateTopicFormContext.useSelect(state => state.isPending)

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
