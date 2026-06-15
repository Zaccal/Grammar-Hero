import { protectedProcedure, router } from '../../lib/trpc'
import { reportSchema } from '../../schemas/report.schema'
import { createReport } from './report.conroller'

export const reportRouter = router({
  createReport: protectedProcedure
    .input(reportSchema)
    .mutation(({ input }) => createReport(input)),
})
