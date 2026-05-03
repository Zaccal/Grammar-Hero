import type { CreateTopicFormSchema as EditTopicFormSchema } from '@/schemas/createTopicForm.schema'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { EditTopicFormExercisesContext } from './EditTopicFormExercisesContext'

interface EditTopicFormExercisesProps {
  children?: React.ReactNode | React.ReactNode[]
  className?: string
}

export function EditTopicFormExercises({
  children,
  className,
}: EditTopicFormExercisesProps) {
  const form = useFormContext<EditTopicFormSchema>()
  const { fields, move, remove, append } = useFieldArray({
    control: form.control,
    name: 'exercises',
  })

  return (
    <EditTopicFormExercisesContext.Provider
      value={{ fields, move, remove, append }}
    >
      <section className={className}>
        <h3 className="text-xl font-bold mb-6">Create Topic Exercises</h3>
        {children}
      </section>
    </EditTopicFormExercisesContext.Provider>
  )
}
