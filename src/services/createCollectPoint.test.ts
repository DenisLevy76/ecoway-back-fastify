import { describe, it, expect, beforeEach } from 'vitest'
import { CreateCollectPointService } from './createCollectPoint.service'
import { InMemoryCollectPointRepository } from '@/repositories/inMemory/collectPoint.repository'

let createCollectPoint: CreateCollectPointService

describe('createCollectPoint.service', () => {
  beforeEach(() => {
    createCollectPoint = new CreateCollectPointService(
      new InMemoryCollectPointRepository(),
    )
  })

  it('should be able to create a new collect point.', async () => {
    const { collectPoint } = await createCollectPoint.execute({
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

    expect(collectPoint.id).toEqual(expect.any(String))
    expect(collectPoint.name).toEqual('UNAMA - Alcindo Cacela')
  })
})
