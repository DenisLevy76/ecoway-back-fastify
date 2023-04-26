import { FastifyInstance } from 'fastify'
import { listNearbyCollectPointsController } from '../controllers/listNearbyCollectPoints.controller'
import { protectedRouteMiddleware } from '@/middlewares/protectedRoute'

export const appRoutes = async (app: FastifyInstance) => {
  app.get('/collect-points', listNearbyCollectPointsController)
  app.post('/collect-points', () => {})
  app.post('/reports', { preHandler: [protectedRouteMiddleware] }, () => {})
}
