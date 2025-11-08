import path from 'node:path'

export function getIsInsideBase(base: string, candidate: string) {
  const b = path.resolve(base) + path.sep
  const t = path.resolve(candidate)
  return t.startsWith(b)
}
