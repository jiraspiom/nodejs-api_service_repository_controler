export class AcumuladorPorAtivo {
  private acumuladoPorAtivo: {
    [key: string]: {
      valorTotalAcumulado: number
      quantidadeAcumulada: number
      somaPrecos: number
      contador: number
    }
  } = {}

  public calculaValorOperacao(
    tipo: string,
    preco: string,
    quantidade: number,
  ): number {
    return tipo === 'COMPRA'
      ? Number((parseFloat(preco) * quantidade).toFixed(2))
      : Number(-(parseFloat(preco) * quantidade).toFixed(2))
  }

  public calculaAcumulado(
    tipo: string,
    ativo: string,
    valorOperacao: number,
    quantidade: number,
    preco: number,
  ): void {
    if (!this.acumuladoPorAtivo[ativo]) {
      this.acumuladoPorAtivo[ativo] = {
        valorTotalAcumulado: 0,
        quantidadeAcumulada: 0,
        somaPrecos: 0,
        contador: 0,
      }
    }

    this.acumuladoPorAtivo[ativo].valorTotalAcumulado += valorOperacao
    this.acumuladoPorAtivo[ativo].quantidadeAcumulada += quantidade

    if (tipo === 'COMPRA') {
      this.acumuladoPorAtivo[ativo].somaPrecos += preco
      this.acumuladoPorAtivo[ativo].contador += 1
    }
  }

  public getEstadoAtual(ativo: string): {
    valorTotalAcumulado: number
    quantidadeAcumulada: number
    mediaPreco: number
  } {
    const acumulado = this.acumuladoPorAtivo[ativo] || {
      valorTotalAcumulado: 0,
      quantidadeAcumulada: 0,
      somaPrecos: 0,
      contador: 0,
    }

    const mediaPreco = acumulado.contador
      ? acumulado.somaPrecos / acumulado.contador
      : 0

    return {
      valorTotalAcumulado: acumulado.valorTotalAcumulado,
      quantidadeAcumulada: acumulado.quantidadeAcumulada,
      mediaPreco,
    }
  }
}
