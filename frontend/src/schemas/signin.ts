import { z } from 'zod'

export const signInSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(3).max(20),
})
export type SignInSchemaType = z.infer<typeof signInSchema>
