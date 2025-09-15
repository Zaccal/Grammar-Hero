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
  durationValues,
  filterFormSchema,
  type FilterFormSchema,
} from '@/schemas/filter.schema'
import { getDurationOption } from '@/utils/getDurationOption'

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
      level: searchParams.level || 'All',
      duration: getDurationOption(
        searchParams.durationMin,
        searchParams.durationMax
      ),
    },
  })

  function onSubmit(data: FilterFormSchema) {
    const duration = data.duration === undefined ? 'All' : data.duration
    navigate({
      to: route,
      search: {
        ...data,
        level: data.level === 'All' ? undefined : data.level,
        durationMin: durationValues[duration].min,
        durationMax: durationValues[duration].max,
      },
    })
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
          'space-y-4 sm:space-y-0 sm:flex items-center justify-between gap-2 container-lg mb-12',
          className
        )}
      >
        {children}
      </div>
    </filterContext.Provider>
  )
}
