import type { RouteExtensions } from '@tanstack/router-core'
import type { FilterFormSchema } from '@/schemas/filter.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { durationValues, filterFormSchema } from '@/schemas/filter.schema'
import { getDurationOption } from '@/utils/index'
import { filterContext } from './FilterContext'

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
