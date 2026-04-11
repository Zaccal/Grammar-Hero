import type { CreateTopicFormSchema } from '@/schemas/createTopicForm.schema'
import { Controller, useFormContext } from 'react-hook-form'
import { Textarea } from '@/components/ui/textarea'

interface CreateTopicFormExercisesItemQuestionProps {
  index: number
}

export default function CreateTopicFormExercisesItemQuestion({
  index,
}: CreateTopicFormExercisesItemQuestionProps) {
  const form = useFormContext<CreateTopicFormSchema>()

  return (
    <>
      <Controller
        name={`exercises.${index}.question`}
        control={form.control}
        render={({ field }) => (
          <Textarea {...field} rows={4} placeholder="Enter a question" />
        )}
      />
    </>
  )
}
