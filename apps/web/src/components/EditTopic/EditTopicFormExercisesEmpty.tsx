import { Pencil } from 'lucide-react'
import { Button } from '../ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '../ui/empty'
import { useExercisesContext } from './EditTopicFormExercisesContext'

export function EditTopicFormExercisesEmpty() {
  const { fields, append } = useExercisesContext()

  if (fields.length > 0) {
    return null
  }

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia>
          <Pencil />
        </EmptyMedia>
        <EmptyTitle>No exercises yet</EmptyTitle>
        <EmptyDescription>
          Add exercises to your topic to get started.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            append({
              id: crypto.randomUUID(),
              question: '',
              answers: [],
              explanation: '',
              hint: '',
              isMultipleChoice: false,
            })}
        >
          Create Exercise
        </Button>
      </EmptyContent>
    </Empty>
  )
}
