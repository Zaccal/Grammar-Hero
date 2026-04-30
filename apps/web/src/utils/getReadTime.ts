import dateformat from 'dateformat'

export function getReadTime(min: Date, max?: Date | null) {
  if (max) {
    return `${dateformat(min, 'MM')}-${dateformat(max, 'MM')} minutes read`
  }
  return `${dateformat(min, 'MM')}+ minutes read`
}
