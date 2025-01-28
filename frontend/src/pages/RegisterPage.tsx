import { Input } from '@/components/ui/input.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.tsx'
import { signUpSchema, SignUpSchemaType } from '@/schemas/signup.ts'
import { toast, Toaster } from 'sonner'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { useZodForm } from '@/hooks/useZodForm.ts'
import { useMutation } from '@tanstack/react-query'

interface SignUpRequest {
  username: string
  email: string
  password: string
}

interface SignUpResponse {
  token: string
}

async function signUp(data: SignUpRequest): Promise<SignUpResponse> {
  const response = await axios.post('http://localhost:3000/auth/signup', data)
  return response.data
}

export default function RegisterPage() {
  const form = useZodForm(signUpSchema)
  const navigate = useNavigate()

  const { mutate } = useMutation<SignUpResponse, Error, SignUpRequest>({
    mutationFn: signUp,
    onSuccess: (data) => {
      localStorage.setItem('token', data.token)
      toast('Registration successful!')
      navigate('/chatpage')
    },
    onError: () => {
      toast.error('Registration failed. Please try again.')
    },
  })

  const handleFormSubmit = (data: SignUpSchemaType) => {
    mutate(data)
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <Form {...form}>
          <Toaster />
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Your username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
