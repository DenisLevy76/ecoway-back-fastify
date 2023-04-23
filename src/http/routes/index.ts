import { FastifyInstance } from 'fastify'
import { registerUserController } from '../controllers/registerUser.controller'
import { authenticateController } from '../controllers/authenticate.controller'
import { protectedRouteMiddleware } from '@/middlewares/protectedRoute'

export const appRoutes = async (app: FastifyInstance) => {
  app.post('/users', registerUserController)
  app.post('/sessions', authenticateController)
  app.post('/collect-points', () => {})
  app.post('/reports', { preHandler: [protectedRouteMiddleware] }, () => {})
}
