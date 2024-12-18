import { z } from 'zod'

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3).max(20),
})
export type SignUpSchemaType = z.infer<typeof signUpSchema>
