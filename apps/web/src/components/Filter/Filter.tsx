import { createContext } from '@/hooks'
import type { FilterParamsSchema } from '@server/schemas/filterParams.schema'
import {
  useNavigate,
  useSearch,
  type UseNavigateResult,
} from '@tanstack/react-router'
import type { RouteExtensions } from '@tanstack/router-core'
import { cn } from '@/lib/utils'
import { useForm, type UseFormReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  filterFormSchema,
  type FilterFormSchema,
} from '@/schemas/filter.schema'

interface FilterContext {
  form: UseFormReturn<FilterFormSchema>
  searchParams: Partial<FilterParamsSchema>
  navigate: UseNavigateResult<'/'>
  onSubmit: (data: FilterFormSchema) => void
}

export const filterContext = createContext<FilterContext>()

interface FilterRootProps {
  children?: React.ReactNode
  className?: string
  route: RouteExtensions<'/', '/'>['fullPath']
}

export function FilterRoot({ children, className, route }: FilterRootProps) {
  const searchParams = useSearch({
    from: route,
  })

  const navigate = useNavigate({
    from: route,
  })

  const form = useForm<FilterFormSchema>({
    resolver: zodResolver(filterFormSchema),
    defaultValues: {
      sort: searchParams.sort,
      sortField: searchParams.sortField,
      level: searchParams.level,
      duration: searchParams.duration,
    },
  })

  function onSubmit(data: FilterFormSchema) {
    console.log(data)
  }

  return (
    <filterContext.Provider
      initialValue={{
        form,
        searchParams,
        navigate,
        onSubmit,
      }}
    >
      <div
        className={cn(
          'flex items-center justify-between gap-2 container-lg mb-12',
          className
        )}
      >
        {children}
      </div>
    </filterContext.Provider>
  )
}
