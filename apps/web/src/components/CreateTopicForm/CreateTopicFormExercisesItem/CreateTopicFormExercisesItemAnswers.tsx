import type {
  CreateTopicFormSchema,
} from '@/schemas/createTopicForm.schema'
import { DragDropProvider } from '@dnd-kit/react'
import { isSortable, useSortable } from '@dnd-kit/react/sortable'
import { GripVertical, Minus, Plus } from 'lucide-react'
import { Controller, useFieldArray, useFormContext, type UseFieldArrayRemove, type UseFieldArrayReplace } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'

interface CreateTopicFormExercisesItemAnswersProps {
  exerciseIndex: number
}

export default function CreateTopicFormExercisesItemAnswers({
  exerciseIndex,
}: CreateTopicFormExercisesItemAnswersProps) {
  const form = useFormContext<CreateTopicFormSchema>()
  const { fields, append, move, remove, replace } = useFieldArray({
    control: form.control,
    name: `exercises.${exerciseIndex}.answers`,
  })

  function appendAnswerHandler() {
    const id = crypto.randomUUID()
    append({ id, isCorrect: false, text: '' })
  }

  return (
    <div className="mt-4">
      <div className="mb-4 space-y-2">
        <DragDropProvider
          onDragEnd={event => {
            if (event.canceled) {
              return
            }
            const { source } = event.operation
            if (isSortable(source)) {
              const { initialIndex, index } = source
              if (initialIndex !== index) {
                move(initialIndex, index)
              }
            }
          }}
        >
          {fields.map((answer, index) => (
            <CreateTopicFormExercisesItemAnswersRow
              remove={remove}
              replace={replace}
              key={answer.id}
              answerIndex={index}
              exerciseIndex={exerciseIndex}
              id={answer.id}
            />
          ))}
        </DragDropProvider>
      </div>

      <Button onClick={appendAnswerHandler} type="button" variant="dashed">
        <Plus />
        Add answers
      </Button>
    </div>
  )
}

interface CreateTopicFormExercisesItemAnswersRowProps {
  answerIndex: number
  exerciseIndex: number
  id: string
  remove: UseFieldArrayRemove
  replace: UseFieldArrayReplace<CreateTopicFormSchema>
}

function CreateTopicFormExercisesItemAnswersRow({
  answerIndex,
  exerciseIndex,
  id,
  remove,
  replace,
}: CreateTopicFormExercisesItemAnswersRowProps) {
  const form = useFormContext<CreateTopicFormSchema>()
  const { ref, handleRef } = useSortable({
    id,
    index: answerIndex,
  })
  const isMultipleChoice = form.watch(`exercises.${exerciseIndex}.isMultipleChoice`)
  const isCorrect = form.watch(`exercises.${exerciseIndex}.answers.${answerIndex}.isCorrect`)
  const answers = form.watch(`exercises.${exerciseIndex}.answers`)

  function handleCheckboxChange() {
    if (isMultipleChoice) {
      form.setValue(`exercises.${exerciseIndex}.answers.${answerIndex}.isCorrect`, !isCorrect)
    } else {
      replace(answers.map((answer, index) => ({
        ...answer,
        isCorrect: answerIndex === index ? !isCorrect : false,
      })))
    }
  }

  return (
    <div ref={ref} className="flex items-center gap-3">
      <Controller
        name={`exercises.${exerciseIndex}.answers.${answerIndex}.isCorrect`}
        control={form.control}
        render={({ field }) => (
          <Checkbox
            defaultChecked={field.value}
            checked={field.value}
            onCheckedChange={handleCheckboxChange}
          />
        )}
      />
      <Controller
        name={`exercises.${exerciseIndex}.answers.${answerIndex}.text`}
        control={form.control}
        render={({ field }) => <Input {...field} />}
      />
      <Button
        ref={handleRef}
        size="icon"
        variant="secondary"
        type="button"
        className="cursor-grab"
      >
        <GripVertical />
      </Button>
      <Button
        onClick={() => remove(answerIndex)}
        size="icon"
        variant="destructive"
        type="button"
      >
        <Minus />
      </Button>
    </div>
  )
}
