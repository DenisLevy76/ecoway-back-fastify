import { CollectPoint } from '@prisma/client'
import { ICollectPointRepository } from '@/repositories/ICollectPoint.repository'

export interface ICreateCollectPointService {
  name: string
  lat: number
  long: number
  initial_collect_time_in_minutes: number
  final_collect_time_in_minutes: number
  dates_of_collect: number[]
  collect_types: string[]
  local_images: string[]
  street: string
  city: string
  state: string
  CEP: string
  country: string
  phone?: string
  description?: string
}

interface ICreateCollectPointServiceResponse {
  collectPoint: CollectPoint
}

export class CreateCollectPointService {
  constructor(private collectPointRepository: ICollectPointRepository) {}

  async execute(
    data: ICreateCollectPointService,
  ): Promise<ICreateCollectPointServiceResponse> {
    const collectPoint = await this.collectPointRepository.create(data)
    return { collectPoint }
  }
}
