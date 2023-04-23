import { Prisma, CollectPoint } from '@prisma/client'

export interface IFindManyNearbyParams {
  latitude: number
  longitude: number
}

export interface ICollectPointRepository {
  findById(id: string): Promise<CollectPoint | null>
  findManyNearby(coordinates: IFindManyNearbyParams): Promise<CollectPoint[]>
  create(data: Prisma.CollectPointCreateInput): Promise<CollectPoint>
}
