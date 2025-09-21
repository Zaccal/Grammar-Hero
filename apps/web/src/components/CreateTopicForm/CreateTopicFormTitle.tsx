import { FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { createTopicFormContext } from './CreateTopicForm'
import { useFileUploadMutationState } from '@/hooks/index'

export const CreateTopicFormTitle = () => {
  const form = createTopicFormContext.useSelect(state => state.form)
  const { isPending } = useFileUploadMutationState()

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
                variant={'lg'}
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
