import { EmailAlreadyExistsError } from '@/services/errors/emailAlreadyExists.error'
import { makeListCollectPointsService } from '@/services/factories/makeListCollectPointsService'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const listNearbyCollectPointsController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const listNearbyCollectPointsBodySchema = z.object({
    userLatitude: z.coerce.number(),
    userLongitude: z.coerce.number(),
  })

  const { userLatitude, userLongitude } =
    listNearbyCollectPointsBodySchema.parse(request.body)

  try {
    const listNearbyCollectPointsService = makeListCollectPointsService()

    const nearbyCollectPoints = await listNearbyCollectPointsService.execute({
      userLatitude,
      userLongitude,
    })

    return reply.status(200).send({ nearbyCollectPoints })
  } catch (error) {
    if (error instanceof EmailAlreadyExistsError) {
      return reply.status(409).send({
        error: { message: error.message },
      })
    }

    throw error
  }
}
