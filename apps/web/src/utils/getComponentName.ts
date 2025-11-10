import { isValidElement } from 'react'

export function getComponentName(node: React.ReactNode): string | null {
  if (!isValidElement(node)) {
    return null
  }

  const type = node.type

  if (typeof type === 'string') {
    return type
  }

  if (typeof type === 'function') {
    return (type as React.FunctionComponent).displayName || type.name || null
  }

  return null
}
