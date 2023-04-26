import { prisma } from '@/lib/prisma'
import { Prisma, Report } from '@prisma/client'
import { IReportsRepository } from '../IReports.repository'

export class PrismaUsersRepository implements IReportsRepository {
  async create(data: Prisma.ReportUncheckedCreateInput): Promise<Report> {
    const report = await prisma.report.create({
      data,
    })

    return report
  }
}
