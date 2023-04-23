import { Prisma, CollectPoint } from '@prisma/client'

export interface ICollectPointRepository {
  findById(id: string): Promise<CollectPoint | null>
  create(data: Prisma.CollectPointCreateInput): Promise<CollectPoint>
}
