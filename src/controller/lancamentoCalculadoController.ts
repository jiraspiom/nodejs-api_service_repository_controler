import { FastifyReply, FastifyRequest } from 'fastify'
import { LancamentoService } from '../services/lancamentoServices'

const acumuladoPorAtivo: {
  [key: string]: { valorTotalAcumulado: number; quantidadeAcumulada: number }
} = {}

export const lancamentoCalculadoController = {
  async getAll(request: FastifyRequest, reply: FastifyReply) {
    try {
      const dados = await LancamentoService.getAll()

      const novo = dados.map((x) => {
        const valorOperacao = calculaValorOperacao(x.preco, x.quantidade)
        calculaAcumulado(x.ativo, valorOperacao, x.quantidade)
        const novoObjeto = {
          ...x,
          valOperacao: valorOperacao,
          valorTotalAcumulado: acumuladoPorAtivo[x.ativo].valorTotalAcumulado,
          quantidadeAcumulada: acumuladoPorAtivo[x.ativo].quantidadeAcumulada,
        }
        return novoObjeto
      })

      reply.send(novo)
    } catch (error) {
      reply.status(500).send({ erro: 'Erro ao lançamentos', error })
    }
  },
}

const calculaValorOperacao = (valor: string, quantidade: number): number => {
  // (Number(parseFloat(x.preco)) * x.quantidade).toFixed(2)
  return Number((parseFloat(valor) * quantidade).toFixed(2))
}

const calculaAcumulado = (
  ativo: string,
  valorOperacao: number,
  quantidade: number,
): void => {
  if (!acumuladoPorAtivo[ativo]) {
    acumuladoPorAtivo[ativo] = {
      valorTotalAcumulado: 0,
      quantidadeAcumulada: 0,
    }
  }

  acumuladoPorAtivo[ativo].valorTotalAcumulado += valorOperacao
  acumuladoPorAtivo[ativo].quantidadeAcumulada += quantidade
}
