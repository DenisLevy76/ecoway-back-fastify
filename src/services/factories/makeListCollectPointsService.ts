import { ListNearbyCollectPointsService } from '../listNearbyCollectPoints.service'
import { InMemoryCollectPointRepository } from '@/repositories/inMemory/collectPoint.repository'

export const makeListCollectPointsService = () => {
  const prismaCollectPointRepository = new InMemoryCollectPointRepository()
  const registerUserService = new ListNearbyCollectPointsService(
    prismaCollectPointRepository,
  )

  return registerUserService
}
