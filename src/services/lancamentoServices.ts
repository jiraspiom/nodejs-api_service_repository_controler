import { LancamentoData } from '../interfaces/LancamentoInterface'
import { LancamentoRepository } from '../repository/LancementoRepository'

export const LancamentoService = {
  async register(dado: LancamentoData) {
    return LancamentoRepository.createLancamento(dado)
  },

  async getAll() {
    return LancamentoRepository.getAllLancementos()
  },

  async getById(id: number) {
    return LancamentoRepository.getLancamentoById(id)
  },

  async update(id: number, dado: LancamentoData) {
    return LancamentoRepository.updateLancemento(id, dado)
  },

  async remove(id: number) {
    return LancamentoRepository.removerLancemento(id)
  },
}
