import { z } from 'zod'

export const LancamentoSchema = z.object({
  data: z.date(),
  operacao: z.string(),
  setor: z.string(),
  quantidade: z.number(),
  preco: z.number(),
})

export type LancamentoData = z.infer<typeof LancamentoSchema>
