import { FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Textarea } from '../ui/textarea'
import { createTopicFormContext } from './CreateTopicFormContext'
import { useFileUploadMutationState } from '@/hooks/index'

export const CreateTopicFormShortDescription = () => {
  const form = createTopicFormContext.useSelect(state => state.form)
  const { isPending } = useFileUploadMutationState()

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
                variant={'lg'}
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
