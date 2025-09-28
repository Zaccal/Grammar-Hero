import type { TRPCClientErrorLike } from '@trpc/client'
import type { DefaultErrorShape } from '@trpc/server/unstable-core-do-not-import'
import { useRouter } from '@tanstack/react-router'
import { queryClient } from '@/lib/trpc'
import { Button } from './ui/button'

interface ErrorComponentProps {
  error?: TRPCClientErrorLike<{
    transformer: true
    errorShape: DefaultErrorShape
  }>
}

function ErrorComponent({ error }: ErrorComponentProps) {
  const router = useRouter()

  const handleReload = () => {
    queryClient.invalidateQueries()
    router.invalidate()
  }

  return (
    <div className="w-full h-[90vh] flex items-center justify-center">
      <div className="max-w-lg space-y-4">
        <h1 className="text-destructive text-2xl">
          Opps! something went wrong.
        </h1>
        <p className="text-muted-foreground text-sm">
          {error?.message ??
            'The page you’re looking for isn’t available right now. It may have been moved, deleted, or the link might be incorrect. Please check the URL or return to the homepage.'}
        </p>
        <Button onClick={handleReload}>Try again!</Button>
      </div>
    </div>
  )
}

export default ErrorComponent
