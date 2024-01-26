import { FastifyReply, FastifyRequest } from 'fastify'
import { LancamentoService } from '../services/lancamentoServices'
import { AcumuladorPorAtivo } from '../lib/acumuladorPorAtivo'

// const acumuladoPorAtivo: {
//   [key: string]: {
//     valorTotalAcumulado: number
//     quantidadeAcumulada: number
//     somaPrecos: number
//     contador: number
//   }
// } = {}

export const lancamentoCalculadoController = {
  async getAll(request: FastifyRequest, reply: FastifyReply) {
    try {
      const dados = await LancamentoService.getAll()
      const acumulador = new AcumuladorPorAtivo()

      const novo = dados.map((x) => {
        const valorOperacao = acumulador.calculaValorOperacao(
          x.operacao,
          x.preco,
          x.quantidade,
        )

        acumulador.calculaAcumulado(
          x.operacao,
          x.ativo,
          valorOperacao,
          x.quantidade,
          Number(x.preco),
        )

        const { valorTotalAcumulado, quantidadeAcumulada, mediaPreco } =
          acumulador.getEstadoAtual(x.ativo)

        const novoObjeto = {
          ...x,
          valOperacao: valorOperacao,
          valorTotalAcumulado,
          quantidadeAcumulada,
          mediaPreco,
        }

        return novoObjeto
      })

      reply.send(novo)
    } catch (error) {
      reply.status(500).send({ erro: 'Erro ao calcular', error })
    }
  },
}

// const calculaValorOperacao = (
//   tipo: string,
//   preco: string,
//   quantidade: number,
// ): number => {
//   // (Number(parseFloat(x.preco)) * x.quantidade).toFixed(2)
//   return tipo === 'COMPRA'
//     ? Number((parseFloat(preco) * quantidade).toFixed(2))
//     : Number(-(parseFloat(preco) * quantidade).toFixed(2))
// }

// const calculaAcumulado = (
//   tipo: string,
//   ativo: string,
//   valorOperacao: number,
//   quantidade: number,
//   preco: number,
// ): void => {
//   if (!acumuladoPorAtivo[ativo]) {
//     acumuladoPorAtivo[ativo] = {
//       valorTotalAcumulado: 0,
//       quantidadeAcumulada: 0,
//       somaPrecos: 0,
//       contador: 0,
//     }
//   }

//   acumuladoPorAtivo[ativo].valorTotalAcumulado += valorOperacao
//   acumuladoPorAtivo[ativo].quantidadeAcumulada += quantidade

//   if (tipo === 'COMPRA') {
//     acumuladoPorAtivo[ativo].somaPrecos += preco
//     acumuladoPorAtivo[ativo].contador += 1
//   }
// }
