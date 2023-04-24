import { describe, it, beforeEach, expect } from 'vitest'
import { CreateCollectPointService } from './createCollectPoint.service'
import { InMemoryCollectPointRepository } from '@/repositories/inMemory/collectPoint.repository'
import { CreateReportService } from './createReport.service'
import { InMemoryReportsRepository } from '@/repositories/inMemory/reports.repository'

let inMemoryCollectPointRepository: InMemoryCollectPointRepository
let inMemoryReportsRepository: InMemoryReportsRepository
let createCollectPointService: CreateCollectPointService
let createReportService: CreateReportService

describe('createCollectPoint.service', () => {
  beforeEach(() => {
    inMemoryCollectPointRepository = new InMemoryCollectPointRepository()
    inMemoryReportsRepository = new InMemoryReportsRepository()

    createCollectPointService = new CreateCollectPointService(
      inMemoryCollectPointRepository,
    )

    createReportService = new CreateReportService(inMemoryReportsRepository)
  })

  it('should be able to report a collect point status.', async () => {
    const { collectPoint } = await createCollectPointService.execute({
      name: 'UNAMA - Alcindo Cacela',
      CEP: '66060-902',
      city: 'belém',
      collect_types: ['metal', 'glass'],
      country: 'brazil',
      state: 'pa',
      dates_of_collect: [1, 5],
      final_collect_time_in_minutes: 540,
      initial_collect_time_in_minutes: 600,
      lat: -1.3801938,
      long: -49.5232044,
      local_images: [],
      street: 'Av. Alcindo Cacela, 287',
    })

    const { report } = await createReportService.execute({
      collectPointId: collectPoint.id,
      description: 'Caçamba de metal lotada.',
      localImage:
        'https://radiocaxias.com.br/portal/imagens/novidade/1e4e4c6615d64dc18503894b319de9d1.png',
      status: 'full',
      userId: '123',
    })

    expect(report.id).toEqual(expect.any(String))
    expect(report.collect_point_id).toEqual(collectPoint.id)
  })
})
