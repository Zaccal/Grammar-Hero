import type { CreateTopicFormSchema } from '@/schemas/createTopicForm.schema'
import { Controller, useFormContext } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'

interface CreateTopicFormExercisesItemChoicesProps {
  index: number
}

export default function CreateTopicFormExercisesItemChoices({
  index,
}: CreateTopicFormExercisesItemChoicesProps) {
  const form = useFormContext<CreateTopicFormSchema>()
  return (
    <>
      <div className="flex items-center gap-3 mt-4 h-4">
        <span className="block text-sm text-muted-foreground">Choises</span>
        <Separator orientation="vertical" />
        <div className="flex gap-2">
          <Label
            htmlFor="multiple"
            className="text-sm text-muted-foreground font-normal"
          >
            Multiple Choice
          </Label>
          <Controller
            control={form.control}
            name={`exercises.${index}.isMultipleChoice`}
            render={({ field }) => (
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            )}
          />
        </div>
      </div>
    </>
  )
}
