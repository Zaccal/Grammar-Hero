import type { ButtonProps } from '../ui/button'
import { lazy, Suspense } from 'react'
import { Button } from '../ui/button'

const EditTopicPublish = lazy(() => import('./EditTopicPublish'))

export default function EditTopicPublishWrapper({
  children,
  ...props
}: ButtonProps) {
  return (
    <Suspense
      fallback={(
        <Button loading disabled variant="secondary" {...props}>
          Loading
        </Button>
      )}
    >
      <EditTopicPublish {...props}>{children}</EditTopicPublish>
    </Suspense>
  )
}
