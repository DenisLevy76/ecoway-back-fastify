import { getAuth } from '@clerk/fastify'
import { FastifyReply, FastifyRequest } from 'fastify'

export const protectedRouteMiddleware = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { userId } = getAuth(request)
  if (!userId) {
    return reply.code(403).send({ error: { message: 'Unauthorized.' } })
  }
}
