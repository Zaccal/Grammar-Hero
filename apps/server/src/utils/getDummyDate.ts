export function getDummyDate(time: string | undefined) {
  if (!time) {
    return undefined
  }
  return new Date(`1970-01-01T${time}.000Z`)
}
