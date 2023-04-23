import { CollectPoint } from '@prisma/client'
import { ICollectPointRepository } from '@/repositories/ICollectPoint.repository'

export interface IListNearbyCollectPointsService {
  userLat: number
  userLong: number
}

interface IListNearbyCollectPointsServiceResponse {
  collectPoints: CollectPoint[]
}

export class ListNearbyCollectPointsService {
  constructor(private collectPointRepository: ICollectPointRepository) {}

  async execute({
    userLat,
    userLong,
  }: IListNearbyCollectPointsService): Promise<IListNearbyCollectPointsServiceResponse> {
    const collectPoints = await this.collectPointRepository.findManyNearby({
      latitude: userLat,
      longitude: userLong,
    })

    return { collectPoints }
  }
}
