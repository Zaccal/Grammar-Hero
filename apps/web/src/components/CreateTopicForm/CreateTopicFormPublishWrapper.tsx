import type { ButtonProps } from '../ui/button'
import { lazy, Suspense } from 'react'
import { Button } from '../ui/button'

const CreateTopicFormPublish = lazy(() => import('./CreateTopicFormPublish'))

export function CreateTopicFormPublishWrapper({
  children,
  ...props
}: ButtonProps) {
  return (
    <Suspense
      fallback={(
        <Button {...props} loading disabled variant="secondary">
          Loading
        </Button>
      )}
    >
      <CreateTopicFormPublish {...props}>{children}</CreateTopicFormPublish>
    </Suspense>
  )
}
