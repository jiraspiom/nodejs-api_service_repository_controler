import { FastifyInstance } from 'fastify'
import { lancamentoCalculadoController } from '../controller/LancamentoCalculadoController'

export const LancamentoCalculadoRoutes = async (fastify: FastifyInstance) => {
  fastify.get('/', lancamentoCalculadoController.getAll)
}
