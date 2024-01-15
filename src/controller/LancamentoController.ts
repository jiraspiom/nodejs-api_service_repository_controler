import { FastifyReply, FastifyRequest } from 'fastify'
import { LancamentoData } from '../interfaces/LancamentoInterface'
import { LancamentoService } from '../services/lancamentoServices'

export const LancamentoController = {
  async register(request: FastifyRequest, reply: FastifyReply) {
    try {
      const Dado: LancamentoData = request.body as LancamentoData
      console.log(Dado)

      const lancamento = await LancamentoService.register(Dado)
      reply.send(lancamento)
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao registrar lançamento' })
    }
  },

  async getAll(request: FastifyRequest, reply: FastifyReply) {
    try {
      const dados = await LancamentoService.getAll()
      reply.send(dados)
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao lançamentos' })
    }
  },

  async getById(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) {
    try {
      const Id = parseInt(request.params.id, 10)

      const dado = await LancamentoService.getById(Id)

      if (dado) {
        reply.send(dado)
      } else {
        reply.status(404).send({ erro: 'Lançamento não encontrado' })
      }
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao obter lançamento por ID' })
    }
  },

  async update(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) {
    try {
      const Id = parseInt(request.params.id, 10)
      const dado: LancamentoData = request.body as LancamentoData

      const updatedUser = await LancamentoService.update(Id, dado)
      reply.send(updatedUser)
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao atualizar lançamento' })
    }
  },

  async remove(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) {
    try {
      const Id = parseInt(request.params.id, 10)

      await LancamentoService.remove(Id)
      reply.send({ message: 'Lançamento removido com sucesso' })
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao remover lançamento' })
    }
  },
}
