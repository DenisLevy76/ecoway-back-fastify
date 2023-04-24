import { IReportsRepository } from '@/repositories/IReports.repository'
import { Report } from '@prisma/client'

export interface IReportService {
  description: string
  status: 'empty' | 'partially empty' | 'full'
  localImage: string
  collectPointId: string
  userId: string
}

interface IReportServiceResponse {
  report: Report
}

export class CreateReportService {
  constructor(private reportsRepository: IReportsRepository) {}

  async execute({
    collectPointId,
    description,
    localImage,
    status,
    userId,
  }: IReportService): Promise<IReportServiceResponse> {
    const report = await this.reportsRepository.create({
      collect_point_id: collectPointId,
      local_image: localImage,
      user_id: userId,
      description,
      status,
    })

    return { report }
  }
}
