import { Prisma, CollectPoint } from '@prisma/client'
import { ICollectPointRepository } from '../ICollectPoint.repository'
import { Decimal } from '@prisma/client/runtime'
import crypto from 'node:crypto'
export class InMemoryCollectPointRepository implements ICollectPointRepository {
  public collectPoints: CollectPoint[] = []

  async create(data: Prisma.CollectPointCreateInput): Promise<CollectPoint> {
    const collectPoint: CollectPoint = {
      id: crypto.randomUUID(),
      description: data.description || '',
      name: data.name,
      CEP: data.CEP,
      city: data.city,
      collect_types: data.collect_types as string[],
      country: data.country,
      state: data.state,
      dates_of_collect: data.dates_of_collect as number[],
      final_collect_time_in_minutes: data.final_collect_time_in_minutes,
      initial_collect_time_in_minutes: data.initial_collect_time_in_minutes,
      lat: new Decimal(data.lat as number),
      long: new Decimal(data.long as number),
      local_images: data.local_images as string[],
      street: data.street,
      phone: (data.phone as string) || null,
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
