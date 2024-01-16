import { PrismaClient } from '@prisma/client'
import { LancamentoData } from '../interfaces/LancamentoInterface'

const prisma = new PrismaClient()

export const LancamentoRepository = {
  async createLancamento(dado: LancamentoData) {
    const dataAtual = new Date()
    dataAtual.setUTCHours(dataAtual.getUTCHours() - 3)
    dado.create_at = dataAtual

    return prisma.lancamento.create({ data: dado })
  },

  async getAllLancementos() {
    return prisma.lancamento.findMany()
  },

  async getLancamentoById(id: string) {
    console.log('o idi iaqui', id)
    return prisma.lancamento.findUnique({ where: { id } })
  },

  async updateLancemento(id: string, dado: LancamentoData) {
    const dataAtual = new Date()
    dataAtual.setUTCHours(dataAtual.getUTCHours() - 3)
    dado.update_at = dataAtual

    return prisma.lancamento.update({ where: { id }, data: dado })
  },

  async removerLancemento(id: string) {
    return prisma.lancamento.delete({ where: { id } })
  },
}
