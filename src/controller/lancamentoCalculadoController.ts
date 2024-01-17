import { FastifyReply, FastifyRequest } from 'fastify'
import { LancamentoService } from '../services/lancamentoServices'

const acumuladoPorAtivo: {
  [key: string]: {
    valorTotalAcumulado: number
    quantidadeAcumulada: number
    somaPrecos: number
    contador: number
  }
} = {}

export const lancamentoCalculadoController = {
  async getAll(request: FastifyRequest, reply: FastifyReply) {
    try {
      const dados = await LancamentoService.getAll()

      const novo = dados.map((x) => {
        const valorOperacao = calculaValorOperacao(
          x.operacao,
          x.preco,
          x.quantidade,
        )

        calculaAcumulado(
          x.operacao,
          x.ativo,
          valorOperacao,
          x.quantidade,
          Number(x.preco),
        )

        const mediaPreco = acumuladoPorAtivo[x.ativo].contador
          ? acumuladoPorAtivo[x.ativo].somaPrecos /
            acumuladoPorAtivo[x.ativo].contador
          : 0

        const novoObjeto = {
          ...x,
          valOperacao: valorOperacao,
          valorTotalAcumulado: acumuladoPorAtivo[x.ativo].valorTotalAcumulado,
          quantidadeAcumulada: acumuladoPorAtivo[x.ativo].quantidadeAcumulada,
          mediaPreco,
        }
        return novoObjeto
      })

      reply.send(novo)
    } catch (error) {
      reply.status(500).send({ erro: 'Erro ao lançamentos', error })
    }
  },
}

const calculaValorOperacao = (
  tipo: string,
  preco: string,
  quantidade: number,
): number => {
  // (Number(parseFloat(x.preco)) * x.quantidade).toFixed(2)
  return tipo === 'COMPRA'
    ? Number((parseFloat(preco) * quantidade).toFixed(2))
    : Number(-(parseFloat(preco) * quantidade).toFixed(2))
}

const calculaAcumulado = (
  tipo: string,
  ativo: string,
  valorOperacao: number,
  quantidade: number,
  preco: number,
): void => {
  if (!acumuladoPorAtivo[ativo]) {
    acumuladoPorAtivo[ativo] = {
      valorTotalAcumulado: 0,
      quantidadeAcumulada: 0,
      somaPrecos: 0,
      contador: 0,
    }
  }

  acumuladoPorAtivo[ativo].valorTotalAcumulado += valorOperacao
  acumuladoPorAtivo[ativo].quantidadeAcumulada += quantidade

  if (tipo === 'COMPRA') {
    acumuladoPorAtivo[ativo].somaPrecos += preco
    acumuladoPorAtivo[ativo].contador += 1
  }
}
