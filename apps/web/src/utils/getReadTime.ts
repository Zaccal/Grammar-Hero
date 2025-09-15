import dateformat from 'dateformat'

export function getReadTime(min: Date, max: Date) {
  return `${dateformat(min, 'MM')}-${dateformat(max, 'MM')} minutes read`
}
