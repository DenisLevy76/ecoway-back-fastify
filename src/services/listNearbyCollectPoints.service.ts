import { CollectPoint } from '@prisma/client'
import { ICollectPointRepository } from '@/repositories/ICollectPoint.repository'

export interface IListNearbyCollectPointsService {
  userLatitude: number
  userLongitude: number
}

interface IListNearbyCollectPointsServiceResponse {
  collectPoints: CollectPoint[]
}

export class ListNearbyCollectPointsService {
  constructor(private collectPointRepository: ICollectPointRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: IListNearbyCollectPointsService): Promise<IListNearbyCollectPointsServiceResponse> {
    const collectPoints = await this.collectPointRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return { collectPoints }
  }
}
