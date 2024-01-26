import { FastifyInstance } from 'fastify'
import { lancamentoCalculadoController } from '../controller/lancamentoCalculadoController'

export const LancamentoCalculadoRoutes = async (fastify: FastifyInstance) => {
  fastify.get('/', lancamentoCalculadoController.getAll)
}
