import dateformat from 'dateformat'

export function getReadTime(time: Date) {
  return `${time.getMinutes() - 5}-${dateformat(time, 'MM')} minutes read`
}
