import { prisma } from '@/lib/prisma'
import { Prisma, CollectPoint } from '@prisma/client'
import {
  ICollectPointRepository,
  IFindManyNearbyParams,
} from '../ICollectPoint.repository'

export class PrismaCollectPointRepository implements ICollectPointRepository {
  async searchCollectPoint(
    query: string,
    page: number,
    resultsPerPage: number = 10,
  ): Promise<CollectPoint[]> {
    return await prisma.collectPoint.findMany({
      where: {
        name: {
          contains: query,
        },
      },
      take: resultsPerPage,
      skip: resultsPerPage * (page - 1),
    })
  }

  async findManyByStateAndCity(
    state: string,
    city: string,
  ): Promise<CollectPoint[]> {
    const collectPoints = await prisma.collectPoint.findMany({
      where: {
        state,
        city,
      },
      include: {
        reports: true,
      },
    })

    return collectPoints
  }

  async findManyNearby({
    latitude,
    longitude,
  }: IFindManyNearbyParams): Promise<CollectPoint[]> {
    const distanceInKM = 10
    return await prisma.$queryRaw<CollectPoint[]>`
      SELECT * from gyms
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= ${distanceInKM}
    `
  }

  async findById(id: string): Promise<CollectPoint | null> {
    return await prisma.collectPoint.findUnique({
      where: {
        id,
      },
    })
  }

  async create(data: Prisma.CollectPointCreateInput): Promise<CollectPoint> {
    const newCollectPoint = await prisma.collectPoint.create({
      data,
    })

    return newCollectPoint
  }
}
