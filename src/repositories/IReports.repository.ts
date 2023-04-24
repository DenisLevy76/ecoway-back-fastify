import { Prisma, Report } from '@prisma/client'

export interface IReportsRepository {
  create(data: Prisma.ReportUncheckedCreateInput): Promise<Report>
}
