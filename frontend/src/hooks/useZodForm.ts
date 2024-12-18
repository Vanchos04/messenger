import { useForm, UseFormProps, UseFormReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ZodSchema, TypeOf } from 'zod'

export function useZodForm<TSchema extends ZodSchema>(
  schema: TSchema,
  options?: Omit<UseFormProps<TypeOf<TSchema>>, 'resolver'>,
): UseFormReturn<TypeOf<TSchema>> {
  return useForm<TypeOf<TSchema>>({
    ...options,
    resolver: zodResolver(schema),
  })
}
