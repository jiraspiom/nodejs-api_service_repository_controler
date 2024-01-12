import { z } from 'zod'

export const UserDataSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
})

export type UserData = z.infer<typeof UserDataSchema>
