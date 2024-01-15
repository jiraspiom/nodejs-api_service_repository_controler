import { FastifyInstance } from 'fastify'
import { userRoutes } from './userRoutes'
import { LancamentoRoutes } from './LancamentoRoutes'

export const configureRouters = (fastify: FastifyInstance) => {
  fastify.register(userRoutes, { prefix: '/users' })
  fastify.register(LancamentoRoutes, { prefix: '/lancamentos' })
}
