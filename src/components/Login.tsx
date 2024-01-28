import { z } from 'zod'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormField, FormItem, FormControl, FormMessage } from './ui/form'
import { useSession } from 'next-auth/react'
import api from '../lib/axios'
import Link from 'next/link'

const LoginSchema = z.object({
  email: z
    .string()
    .min(2, {
      message: 'This field has to be filled.',
    })
    .email('This is not a valid email.'),
  password: z.string().min(4, {
    message: ' The password field must have at least 4 characters',
  }),
})

export default function Login() {
  const { data: session } = useSession

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmitLogin = async (values: z.infer<typeof LoginSchema>) => {
    console.log(values)
    const res = await api.post('/auth/login', {
      useremail: values.email,
      password: values.password,
    })
    console.log(res)
  }
  return (
    <div className="flex items-center justify-center flex-col flex-1">
      <Link href="/api/auth/signup">login</Link>
      <h1 className="text-2xl mb-4 font-bold">Login</h1>
      <p className="text-sm font-extralight">Enter your informations below</p>
      <Form {...form}>
        <form
          className="grid grid-rows-2 gap-4 my-4 w-2/5"
          onSubmit={form.handleSubmit(onSubmitLogin)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="email" placeholder="Email" {...field} />
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
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="rounded-lg" variant="outline">
            Login
          </Button>
        </form>
      </Form>
    </div>
  )
}
