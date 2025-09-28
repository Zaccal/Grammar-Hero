import type { FilterParamsSchema } from '@server/schemas/filterParams.schema'
import type { UseNavigateResult } from '@tanstack/react-router'
import type { UseFormReturn } from 'react-hook-form'
import type { FilterFormSchema } from '@/schemas/filter.schema'
import { createContext } from '@/hooks'

interface FilterContext {
  form: UseFormReturn<FilterFormSchema>
  searchParams: Partial<FilterParamsSchema>
  navigate: UseNavigateResult<'/'>
  onSubmit: (data: FilterFormSchema) => void
}

export const filterContext = createContext<FilterContext>()
