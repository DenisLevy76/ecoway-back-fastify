import { Prisma, Report } from '@prisma/client'
import { IReportsRepository } from '../IReports.repository'
import crypto from 'node:crypto'

export class InMemoryReportsRepository implements IReportsRepository {
  public reports: Report[] = []

  async create(data: Prisma.ReportUncheckedCreateInput): Promise<Report> {
    const report: Report = {
      id: crypto.randomUUID(),
      description: data.description || '',
      status: data.status,
      collect_point_id: data.collect_point_id,
      user_id: data.user_id,
      created_at: new Date(),
      local_image:
        'https://lh3.googleusercontent.com/p/AF1QipNdQyDfFQ0cYA_wnGao5IJQ1wLI16miCl8lbBKy=s680-w680-h510',
    }

    this.reports.push(report)

    return report
  }
}
