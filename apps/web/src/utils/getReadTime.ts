import dateformat from 'dateformat'

export function getReadTime(min: Date, max?: Date) {
  if (max) {
    return `${dateformat(min, 'MM')}-${dateformat(max, 'MM')} minutes read`
  }
  return `${dateformat(min, 'MM')}+ minutes read`
}
