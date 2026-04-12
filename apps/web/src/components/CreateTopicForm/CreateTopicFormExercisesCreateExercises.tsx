import type { ButtonProps } from '../ui/button'
import { Pencil } from 'lucide-react'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { useExercisesContext } from './CreateTopicFormExercisesContext'

export function CreateTopicFormExercisesCreateExercises({
  children = 'Create Exercise',
  ...props
}: ButtonProps) {
  const { append, fields } = useExercisesContext()

  if (fields.length === 0) { return null }

  return (
    <>
      <p className="text-sm text-muted-foreground text-center mb-4 mt-12">
        Create a new question
      </p>
      <div className="relative flex items-center justify-center w-full mb-6">
        <Separator className="absolute" />
        <div className="relative flex items-center gap-2 bg-background px-4">
          <Button
            variant="outline"
            type="button"
            onClick={event => {
              props.onClick?.(event)
              append({
                id: crypto.randomUUID(),
                question: '',
                answers: [],
                explanation: '',
                hint: '',
                isMultipleChoice: false,
              })
            }}
            {...props}
          >
            <Pencil />
            {children}
          </Button>
        </div>
      </div>
    </>
  )
}
