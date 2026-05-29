export function isEqual<T = unknown>(a: T, b: T): boolean {
  return JSON.stringify(a) === JSON.stringify(b)
}
