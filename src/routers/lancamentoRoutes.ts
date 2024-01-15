import { FastifyInstance } from 'fastify'
import { LancamentoController } from '../controller/LancamentoController'

export const LancamentoRoutes = async (fastify: FastifyInstance) => {
  fastify.post('/register', LancamentoController.register)
  fastify.get('/', LancamentoController.getAll)
  fastify.get('/:id', LancamentoController.getById)
  fastify.put('/:id', LancamentoController.update)
  fastify.delete('/:id', LancamentoController.remove)
}
