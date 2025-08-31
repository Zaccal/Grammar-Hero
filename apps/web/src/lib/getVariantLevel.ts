import type { Level } from '../../../server/prisma/generated/client'

type Variant = 'success' | 'warning' | 'destructive'

export function getVariantLevel(level: Level) {
  const variant: Record<Level, Variant> = {
    Basic: 'success',
    Intermediate: 'warning',
    Advanced: 'destructive',
  }

  return variant[level]
}
