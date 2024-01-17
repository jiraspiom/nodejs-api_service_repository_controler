import { FastifyInstance } from 'fastify'
import { userRoutes } from './userRoutes'
import { LancamentoRoutes } from './lancamentoRoutes'
import { LancamentoCalculadoRoutes } from './lancamentoCalculadoRoutes'

export const configureRouters = (fastify: FastifyInstance) => {
  fastify.register(userRoutes, { prefix: '/users' })
  fastify.register(LancamentoRoutes, { prefix: '/lancamentos' })
  fastify.register(LancamentoCalculadoRoutes, { prefix: '/lancamentoscalc' })
}
