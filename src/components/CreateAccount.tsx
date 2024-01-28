import { Button } from './ui/button'
import { Input } from './ui/input'

import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const CreateAccountSchema = z
  .object({
    username: z.string().min(2, {
      message: 'Username must be at least 2 characters.',
    }),
    email: z
      .string()
      .min(2, {
        message: 'This field has to be filled.',
      })
      .email('This is not a valid email.'),
    password: z.string().min(5, {
      message: ' The password field must have at least 5 characters',
    }),
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match.',
        path: ['confirmPassword'],
      })
    }
  })

export default function CreateAccount() {
  const form = useForm<z.infer<typeof CreateAccountSchema>>({
    resolver: zodResolver(CreateAccountSchema),
  })
  const onSubmitCreateAccount = () => {
    console.log('clickou')
  }
  return (
    <div className="flex items-center justify-center flex-col flex-1 ">
      <h1 className="text-2xl mb-4 font-bold">Create Account</h1>
      <p className="text-sm font-extralight">
        Enter your email below to create your account
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitCreateAccount)}
          className="grid grid-rows-2 gap-4 my-4 w-2/5"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="username" placeholder="Name" {...field} />
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="rounded-lg" variant="outline">
            Create account
          </Button>
          <p className="text-center">
            By clicking continue, you agree to our Terms of Service and Privacy
            Policy.
          </p>
        </form>
      </Form>
    </div>
  )
}
