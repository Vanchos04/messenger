import { signInSchema, SignInSchemaType } from '@/schemas/signin.ts'
import { useZodForm } from '@/hooks/useZodForm.ts'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Button } from '@/components/ui/button.tsx'
import axios from 'axios'
import { toast } from 'sonner'

export function LoginPage() {
  const form = useZodForm(signInSchema)

  const handleFormSubmit = async (data: SignInSchemaType) => {
    try {
      const response = await axios.post('/auth/chatpage', data)
      const { token } = response.data

      localStorage.setItem('token', token)

      toast.success('Login successful!')
      window.location.href = '/chatpage'
    } catch (error) {
      console.error('Login failed:', error)
      toast.error('Invalid credentials')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input type="username" placeholder="Your username" {...field} />
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
                    <Input placeholder="Your email" {...field} />
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
          <div className="text-center mt-4">
            Don't have an account?{' '}
            <a href="/auth/register" className="text-blue-500 hover:underline">
              Signup!
            </a>
          </div>
        </Form>
      </div>
    </div>
  )
}
