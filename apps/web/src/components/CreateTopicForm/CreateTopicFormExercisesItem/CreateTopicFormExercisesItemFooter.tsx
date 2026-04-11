import type { CreateTopicFormSchema } from '@/schemas/createTopicForm.schema'
import { Controller, useFormContext } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface CreateTopicFormExercisesItemFooterProps {
  index: number
}

export default function CreateTopicFormExercisesItemFooter({
  index,
}: CreateTopicFormExercisesItemFooterProps) {
  const form = useFormContext<CreateTopicFormSchema>()

  return (
    <>
      <div className="space-y-4">
        <Controller
          control={form.control}
          name={`exercises.${index}.hint`}
          render={({ field }) => (
            <div className="flex flex-col gap-2 w-full">
              <Label>Hint</Label>
              <Input
                placeholder="Enter a hint"
                value={field.value}
                onChange={field.onChange}
              />
            </div>
          )}
        />
        <Controller
          control={form.control}
          name={`exercises.${index}.explanation`}
          render={({ field }) => (
            <div className="flex flex-col gap-2 w-full">
              <Label>Explanation</Label>
              <Textarea
                placeholder="Enter an explanation"
                value={field.value}
                onChange={field.onChange}
              />
            </div>
          )}
        />
      </div>
    </>
  )
}
