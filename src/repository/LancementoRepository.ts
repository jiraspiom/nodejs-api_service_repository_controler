import { PrismaClient } from '@prisma/client'
import { LancamentoData } from '../interfaces/LancamentoInterface'

const prisma = new PrismaClient()

export const LancamentoRepository = {
  async createLancamento(dado: LancamentoData) {
    return prisma.lancamento.create({ data: dado })
  },
  async getAllLancementos() {
    return prisma.lancamento.findMany()
  },
  async getLancamentoById(id: number) {
    return prisma.lancamento.findUnique({ where: { id } })
  },
  async updateLancemento(id: number, dado: LancamentoData) {
    return prisma.lancamento.update({ where: { id }, data: dado })
  },
  async removerLancemento(id: number) {
    return prisma.lancamento.delete({ where: { id } })
  },
}
