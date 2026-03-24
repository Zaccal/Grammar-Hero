import { FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Textarea } from '../ui/textarea'
import { CreateTopicFormContext } from './CreateTopicFormContext'

export function CreateTopicFormShortDescription() {
  const form = CreateTopicFormContext.useSelect(state => state.form)
  const isPending = CreateTopicFormContext.useSelect(state => state.isPending)

  return (
    <>
      <FormField
        control={form.control}
        name="shortDescription"
        render={({ field }) => (
          <FormItem>
            <FormMessage />
            <FormControl>
              <Textarea
                variant="lg"
                disabled={isPending}
                placeholder="Topic short description"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  )
}
