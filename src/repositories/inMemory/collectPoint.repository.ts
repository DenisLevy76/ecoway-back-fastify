import { Prisma, CollectPoint } from '@prisma/client'
import { ICollectPointRepository } from '../ICollectPoint.repository'
import { Decimal } from '@prisma/client/runtime'
import crypto from 'node:crypto'
export class InMemoryCollectPointRepository implements ICollectPointRepository {
  public collectPoints: CollectPoint[] = []

  async create(data: Prisma.CollectPointCreateInput): Promise<CollectPoint> {
    const collectPoint: CollectPoint = {
      id: crypto.randomUUID(),
      description: '',
      name: 'UNAMA - Alcindo Cacela',
      CEP: '66060-902',
      city: 'belém',
      collect_types: ['metal', 'glass'],
      country: 'brazil',
      state: 'pa',
      dates_of_collect: [1, 5],
      final_collect_time_in_minutes: 540,
      initial_collect_time_in_minutes: 600,
      lat: new Decimal(-1.3801938),
      long: new Decimal(-49.5232044),
      local_images: [],
      street: 'Av. Alcindo Cacela, 287',
      phone: '(91) 4009-3000',
    }

    this.collectPoints.push(collectPoint)

    return collectPoint
  }

  async findById(id: string): Promise<CollectPoint | null> {
    return (
      this.collectPoints.find((collectPoint) => collectPoint.id === id) || null
    )
  }
}
