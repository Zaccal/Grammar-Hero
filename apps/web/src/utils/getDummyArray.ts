export function getDummyArray(count: number) {
  const array = Array.from({ length: count }).fill(0) as number[]

  return array.map((value, index) => value + index)
}
