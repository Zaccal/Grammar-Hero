import { DURATION_REGEX } from '@server/lib/constants'
import * as z from 'zod/mini'
import { durationValues } from '@/schemas/filter.schema'

const getDurationOptionParamSchema = z.string().check(z.regex(DURATION_REGEX))

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
