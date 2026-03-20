import type { ReportSchema } from '@/schemas/report.schema'
import { useFormContext } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

interface ReportModalFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: keyof ReportSchema
  label: string
}

export function ReportModalField({
  name,
  label,
  ...props
}: ReportModalFieldProps) {
  const form = useFormContext<ReportSchema>()

  return (
    <>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormMessage />
            <FormControl>
              {name !== 'message' ? (
                <Input
                  {...field}
                  {...props}
                  disabled={form.formState.isSubmitting}
                />
              ) : (
                <Textarea
                  {...field}
                  placeholder={props.placeholder}
                  disabled={form.formState.isSubmitting}
                />
              )}
            </FormControl>
          </FormItem>
        )}
      />
    </>
  )
}
