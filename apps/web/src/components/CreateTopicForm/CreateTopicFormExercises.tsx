import type { CreateTopicFormSchema } from '@/schemas/createTopicForm.schema'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { CreateTopicFormExercisesContext } from './CreateTopicFormExercisesContext'

interface CreateTopicFormExercisesProps {
  children?: React.ReactNode | React.ReactNode[]
  className?: string
}

// TODO: Make an item small when I drag it
// TODO: Make every item small when I drag it

export function CreateTopicFormExercises({
  children,
  className,
}: CreateTopicFormExercisesProps) {
  const form = useFormContext<CreateTopicFormSchema>()
  const { fields, move, remove, append } = useFieldArray({
    control: form.control,
    name: 'exercises',
  })

  return (
    <CreateTopicFormExercisesContext.Provider
      value={{ fields, move, remove, append }}
    >
      <section className={className}>
        <h3 className="text-xl font-bold mb-6">Create Topic Exercises</h3>
        {children}
      </section>
    </CreateTopicFormExercisesContext.Provider>
  )
}
