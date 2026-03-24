import { Button } from '@/components/ui/button'
import { FilterContext } from './FilterContext'

export function FilterActions() {
  const { form } = FilterContext.useSelect(state => ({
    form: state.form,
  }))

  return (
    <div className="flex flex-col gap-2 w-full">
      <Button type="submit" fullWidth>
        Apply
      </Button>
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={() => {
          form.reset({
            sort: 'desc',
            sortField: 'likes',
            level: 'All',
            duration: 'All',
          })
        }}
      >
        Reset
      </Button>
    </div>
  )
}
