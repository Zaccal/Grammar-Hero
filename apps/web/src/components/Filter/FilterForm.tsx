import { Form } from '../ui/form'
import { FilterContext } from './FilterContext'

interface FilterFormProps {
  children?: React.ReactNode
  className?: string
}

export function FilterForm({ children, className }: FilterFormProps) {
  const form = FilterContext.useSelect(state => state.form)
  const onSubmit = FilterContext.useSelect(state => state.onSubmit)
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
        {children}
      </form>
    </Form>
  )
}
