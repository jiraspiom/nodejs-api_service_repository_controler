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
  async getLancamentoById(id: number) {
    return prisma.lancamento.findUnique({ where: { id } })
  },
  async updateLancemento(id: number, dado: LancamentoData) {
    const dataAtual = new Date()
    dataAtual.setUTCHours(dataAtual.getUTCHours() - 3)
    dado.update_at = dataAtual

    return prisma.lancamento.update({ where: { id }, data: dado })
  },
  async removerLancemento(id: number) {
    return prisma.lancamento.delete({ where: { id } })
  },
}
