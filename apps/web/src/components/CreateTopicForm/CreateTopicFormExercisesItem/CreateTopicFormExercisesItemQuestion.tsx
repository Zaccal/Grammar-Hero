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
  const errors = form.formState.errors
  const questionError = errors.exercises?.[index]?.question?.message

  return (
    <>
      {questionError && (
        <p className="text-sm text-destructive mb-2">{questionError}</p>
      )}
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
