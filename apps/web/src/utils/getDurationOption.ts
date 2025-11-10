import { DURATION_REGEX } from '@server/lib/constants'
import z from 'zod'
import { durationValues } from '@/schemas/filter.schema'

const getDurationOptionParamSchema = z.string().regex(DURATION_REGEX)

export function getDurationOption(min?: string, max?: string) {
  const parseResultMin = getDurationOptionParamSchema.safeParse(min)
  const parseResultMax = getDurationOptionParamSchema.safeParse(max)

  if (parseResultMax.success && parseResultMin.success) {
    const foundResult = Object.entries(durationValues).find(
      ([, value]) => value.min === min && value.max === max
    )

    if (!foundResult) {
      return 'All'
    }

    return foundResult[0]
  }
 else {
    return 'All'
  }
}
