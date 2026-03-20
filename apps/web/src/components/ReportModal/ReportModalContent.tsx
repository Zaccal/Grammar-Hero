import type { DialogContentProps } from '@radix-ui/react-dialog'
import type { ReportSchema } from '@/schemas/report.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { trpc } from '@/lib/trpc'
import { cn } from '@/lib/utils'
import { reportSchema } from '@/schemas/report.schema'
import { Button } from '../ui/button'
import { DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Form } from '../ui/form'
import { reportModalContext } from './ReportModalContext'

export function ReportModalContent({ children, ...props }: DialogContentProps) {
  const reportOnSuccess = reportModalContext.useSelect(state => state.onSuccess)
  const userId = reportModalContext.useSelect(state => state.userId)
  const form = useForm<ReportSchema>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      reason: '',
      message: '',
    },
  })
  const { mutateAsync: createReport } = useMutation(
    trpc.report.createReport.mutationOptions({
      onError: error => {
        toast.error('Failed to submit report', {
          description: error.message,
        })
      },
      onSuccess: () => {
        reportOnSuccess?.()
        toast.success('Report submitted successfully')
        form.reset()
      },
    })
  )

  async function submitHandler(data: ReportSchema) {
    await createReport({
      ...data,
      userId,
    })
  }

  return (
    <DialogContent className={cn('sm:max-w-md', props.className)} {...props}>
      <DialogHeader>
        <DialogTitle>Report</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(submitHandler)}>
          {children}
          <Button type="submit" fullWidth loading={form.formState.isSubmitting}>
            Submit
          </Button>
        </form>
      </Form>
    </DialogContent>
  )
}
