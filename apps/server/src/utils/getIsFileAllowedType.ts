import path from 'node:path'
import { ALLOWED_TYPES } from '../routers/upload/constants'

export function getIsFileAllowedType(name: string) {
  const file = path.extname(name).slice(1).toLocaleLowerCase()
  return !!file && ALLOWED_TYPES.has(file)
}
