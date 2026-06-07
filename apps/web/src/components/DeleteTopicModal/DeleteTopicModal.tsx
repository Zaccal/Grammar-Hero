import type { DialogProps } from '@radix-ui/react-dialog'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { TriangleAlert } from 'lucide-react'
import { toast } from 'sonner'
import { queryClient, trpc } from '@/lib/trpc'
import { invalidateProfileTopics } from '@/utils/invalidateProfileTopics'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { invalidateTopics } from '@/utils'
import { useSearch } from '@tanstack/react-router'
interface DeleteTopicModalProps extends DialogProps {
  topicId: string
}

export function DeleteTopicModal({ topicId, ...props }: DeleteTopicModalProps) {
  const navigate = useNavigate()
  const { mutate: deleteTopic, isPending } = useMutation(
    trpc.topics.delete.mutationOptions({
      onSuccess: async () => {
        await invalidateProfileTopics()

        if (props.onOpenChange) {
          props.onOpenChange(false)
        }
        navigate({
          to: '/',
          replace: true,
        })
        queryClient.invalidateQueries({
          queryKey: trpc.topics.getAll.infiniteQueryKey(),
        })
        toast.success('Topic deleted successfully')
      },
      onError: () => {
        toast.error('Failed to delete topic')
      },
    })
  )

  function onDelete() {
    deleteTopic(topicId)
  }

  function onCancle() {
    if (props.onOpenChange) {
      props.onOpenChange(false)
    }
  }

  return (
    <Dialog {...props}>
      {props.children}
      <DialogContent>
        <DialogHeader className="space-y-2">
          <div className="bg-destructive p-4 rounded-full w-fit mx-auto">
            <TriangleAlert className="text-destructive-foreground" />
          </div>
          <DialogTitle className="text-center">Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the topic
            and all its data.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex flex-col gap-3">
          <Button loading={isPending} variant="destructive" onClick={onDelete}>
            Delete topic
          </Button>
          <Button disabled={isPending} variant="outline" onClick={onCancle}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
