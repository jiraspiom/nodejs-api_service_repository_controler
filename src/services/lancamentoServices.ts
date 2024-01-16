import { LancamentoData } from '../interfaces/LancamentoInterface'
import { LancamentoRepository } from '../repository/LancamentoRepository'

export const LancamentoService = {
  async register(dado: LancamentoData) {
    return LancamentoRepository.createLancamento(dado)
  },

  async getAll() {
    return LancamentoRepository.getAllLancementos()
  },

  async getById(id: string) {
    return LancamentoRepository.getLancamentoById(id)
  },

  async update(id: string, dado: LancamentoData) {
    return LancamentoRepository.updateLancemento(id, dado)
  },

  async remove(id: string) {
    return LancamentoRepository.removerLancemento(id)
  },
}
