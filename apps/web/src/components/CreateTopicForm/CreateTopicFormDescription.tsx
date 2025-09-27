import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Textarea } from '../ui/textarea'
import { createTopicFormContext } from './CreateTopicFormContext'

export const CreateTopicFormDescription = () => {
  const form = createTopicFormContext.useSelect(state => state.form)
  const isPending = createTopicFormContext.useSelect(state => state.isPending)

  return (
    <>
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormMessage />
            <FormControl>
              <Textarea
                variant={'lg'}
                disabled={isPending}
                placeholder="Topic full description"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  )
}
