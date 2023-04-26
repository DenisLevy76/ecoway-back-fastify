import { Prisma, CollectPoint } from '@prisma/client'

export interface IFindManyNearbyParams {
  latitude: number
  longitude: number
}

export interface ICollectPointRepository {
  findById(id: string): Promise<CollectPoint | null>
  findManyByStateAndCity(state: string, city: string): Promise<CollectPoint[]>
  findManyNearby(coordinates: IFindManyNearbyParams): Promise<CollectPoint[]>
  searchCollectPoint(
    query: string,
    page: number,
    resultsPerPage: number,
  ): Promise<CollectPoint[]>
  create(data: Prisma.CollectPointCreateInput): Promise<CollectPoint>
}
