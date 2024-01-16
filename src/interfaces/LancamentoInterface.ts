import { z } from 'zod'

export const LancamentoSchema = z.object({
  data: z.date(),
  operacao: z.string(),
  ativo: z.string(),
  setor: z.string(),
  quantidade: z.number(),
  preco: z.number(),
  create_at: z.date(),
  update_at: z.date().optional(),
})

export type LancamentoData = z.infer<typeof LancamentoSchema>
