import { Form } from '../ui/form'
import { filterContext } from './FilterContext'

interface FilterFormProps {
  children?: React.ReactNode
  className?: string
}

export function FilterForm({ children, className }: FilterFormProps) {
  const form = filterContext.useSelect(state => state.form)
  const onSubmit = filterContext.useSelect(state => state.onSubmit)
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
        {children}
      </form>
    </Form>
  )
}
