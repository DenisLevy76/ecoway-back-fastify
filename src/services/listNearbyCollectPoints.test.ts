import { describe, it, expect, beforeEach } from 'vitest'

import { ListNearbyCollectPointsService } from './listNearbyCollectPoints.service'
import { InMemoryCollectPointRepository } from '@/repositories/inMemory/collectPoint.repository'

let inMemoryRepository: InMemoryCollectPointRepository
let sut: ListNearbyCollectPointsService

describe('ListNearbyCollectPoints service.', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryCollectPointRepository()
    sut = new ListNearbyCollectPointsService(inMemoryRepository)
  })

  it('should be able to list all collect points nearby the user.', async () => {
    await inMemoryRepository.create({
      name: 'Near collect point',
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

    await inMemoryRepository.create({
      name: 'Far collect point 2',
      CEP: '66635-110',
      city: 'belém',
      collect_types: ['metal', 'glass', 'plastic', 'organic'],
      country: 'brazil',
      state: 'pa',
      dates_of_collect: [1, 3, 5, 6],
      final_collect_time_in_minutes: 540,
      initial_collect_time_in_minutes: 600,
      lat: -1.2512973,
      long: -48.4569784,
      local_images: [],
      street: 'Av. Augusto Montenegro, 4300 - Parque Verde',
    })

    const { collectPoints } = await sut.execute({
      userLat: -1.3801938,
      userLong: -49.5232044,
    })

    expect(collectPoints).toEqual([
      expect.objectContaining({ name: 'Near collect point' }),
    ])
  })
})
