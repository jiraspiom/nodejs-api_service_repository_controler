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
      reply.status(500).send({ erro: 'Erro ao registrar lançamento', error })
    }
  },

  async getAll(request: FastifyRequest, reply: FastifyReply) {
    try {
      const dados = await LancamentoService.getAll()
      reply.send(dados)
    } catch (error) {
      reply.status(500).send({ erro: 'Erro ao lançamentos', error })
    }
  },

  async getById(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) {
    try {
      // const Id = parseInt(request.params.id, 10)
      const Id = request.params.id

      const dado = await LancamentoService.getById(Id)

      if (dado) {
        reply.send(dado)
      } else {
        reply.status(404).send({ erro: 'Lançamento não encontrado' })
      }
    } catch (error) {
      reply.status(500).send({ erro: 'Erro ao obter lançamento por ID', error })
    }
  },

  async update(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) {
    try {
      const Id = request.params.id
      const dado: LancamentoData = request.body as LancamentoData

      const updatedUser = await LancamentoService.update(Id, dado)
      reply.send(updatedUser)
    } catch (error) {
      reply.status(500).send({ erro: 'Erro ao atualizar lançamento', error })
    }
  },

  async remove(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) {
    try {
      const Id = request.params.id

      await LancamentoService.remove(Id)
      reply.send({ message: 'Lançamento removido com sucesso' })
    } catch (error) {
      reply.status(500).send({ erro: 'Erro ao remover lançamento', error })
    }
  },
}
