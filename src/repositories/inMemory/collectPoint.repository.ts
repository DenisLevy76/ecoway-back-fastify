import { Prisma, CollectPoint } from '@prisma/client'
import { ICollectPointRepository } from '../ICollectPoint.repository'
import { prisma } from '@/lib/prisma'

export class InMemoryCollectPointRepository implements ICollectPointRepository {
  public collectPoint: CollectPoint[] = []

  async create(data: Prisma.CollectPointCreateInput): Promise<CollectPoint> {
    return await prisma.collectPoint.create({
      data,
    })
  }

  async findById(id: string): Promise<CollectPoint | null> {
    return await prisma.collectPoint.findUnique({
      where: { id },
    })
  }
}
